"use client";

import { useRef, MouseEvent, useState, useEffect } from "react";
import s from "./Item.module.scss";
import cn from "classnames";
import { getHeightAnswer } from "@/app/_handlerFunc/getHeightAnsver";

const Item = ({ count, setCount, index, request, children, close }: any) => {
    const [heightCount, setHeightCount] = useState(0);
    const [height, setHeight] = useState(0);
    const [flag, setFlag] = useState(false);
    const refName = useRef<HTMLDivElement | null>(null);

    const heightAnswerMin = 3;
    const timeOut = 5;
    const procent = heightAnswerMin * (height / 100);

    const click = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (flag) {
            setFlag(false);
        } else {
            setFlag(true);
        }
        if (count !== index) {
            setCount(index);
        } else {
            setCount(null);
        }
    };

    //получение высоты ответа через реф и преобразование в функции
    useEffect(() => {
        setHeight(getHeightAnswer(refName.current?.children));
    }, []);

    //постепенное изменение высоты с помощью интервала, интервал настраивается в timeOut, а минимальная высота в heightAnswerMin
    useEffect(() => {
        if (flag) {
            if (heightCount < height) {
                const timer = setInterval(() => {
                    setHeightCount(heightCount + procent);
                }, timeOut);
                return () => clearInterval(timer);
            }
        } else {
            if (0 <= heightCount) {
                const timer = setInterval(() => {
                    setHeightCount(heightCount - procent);
                }, timeOut);
                return () => clearInterval(timer);
            }
        }
    }, [height, heightCount, flag]);

    // закрытие ответа если нажать на другой
    useEffect(() => {
        if (count !== index) {
            if (0 < heightCount && count !== null) {
                setFlag(false);
                const timer = setInterval(() => {
                    setHeightCount(heightCount - procent);
                }, timeOut);
                return () => clearInterval(timer);
            }
        }
    }, [count, heightCount]);

    return (
        <div
            onClick={(e: MouseEvent<HTMLDivElement>) => {
                click(e);
            }}
            className={s.container}
        >
            <button
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    click(e);
                }}
                className={cn(s.close, flag && s.activeBtn)}
            >
                {close}
            </button>
            <h2 className={s.requst}>{request}</h2>
            <div ref={refName} className={cn(s.answer, flag && s.active)} style={{ height: `${heightCount}px` }}>
                {children}
            </div>
        </div>
    );
};
export default Item;
