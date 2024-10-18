"use client";

import React, { useState, MouseEvent, ChangeEvent, useEffect, useRef } from "react";
import s from "./WriteRewiev.module.scss";
import cn from "classnames";
import { TelegramBotRewievs } from "@/app/_handlerFunc/telegramBot";
import Image from "next/image";
import krestik from "@/public/krestik.svg";
import Rating from "../rating/Rating";
import { createRewiev } from "@/app/_handlerFunc/createRewiev";
import Button from "../Button/Button";
import InputMain from "../Input/InputMain";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import { validPhone } from "@/app/_handlerFunc/validPhone";

const WriteRewiev = () => {
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [rewiev, setRewiev] = useState("");
    const [error, setError] = useState(false);
    const [result, setResult] = useState<boolean | undefined>(false);
    const [rating, setRating] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [phone, setPhone] = useState("");
    const [errorPhone, setErrorPhone] = useState(false);

    const clickActive = () => {
        setActive((prev) => !prev);
    };

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value);
        setError(false);
    };
    const changeRewiev = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setRewiev(e.target.value);
        setError(false);
    };

    const sendApplication = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (name === "" || rewiev === "" || phone === "" || rating === "") {
            setError(true);
            if (validPhone(phone)) {
                setErrorPhone(true);
            }
            return;
        }

        const res = await TelegramBotRewievs({ name, rewiev, phone: `+${phone}`, rating });
        const create = await createRewiev({ name, rewiev, phone: `+${phone}`, rating });

        setResult(create);
    };

    useEffect(() => {
        if (result) {
            const timer = setTimeout(() => {
                setActive(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [result]);
    useEffect(() => {
        if (active) {
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }
        }
    }, [active]);
    return (
        <div className={cn(s.container)}>
            <Button onClick={clickActive}>Оставить отзыв</Button>
            {active && (
                <div onClick={clickActive} className={cn(s.modal)}>
                    <form
                        onClick={(e: MouseEvent<HTMLFormElement>) => {
                            e.stopPropagation();
                        }}
                        className={cn(s.modal__form)}
                    >
                        <button className={cn(s.modal__close)} onClick={clickActive}>
                            <Image src={krestik} alt="close" width={18} height={18} />
                        </button>
                        {!result ? (
                            <>
                                <InputMain
                                    error={error && name === "" ? true : false}
                                    label="Имя"
                                    typeInput="text"
                                    placeholder=""
                                    onChangeInput={changeName}
                                />
                                <InputMain
                                    error={error && rewiev === "" ? true : false}
                                    label="Отзыв"
                                    typeInput="textarea"
                                    placeholder=""
                                    onChangeTextarea={changeRewiev}
                                />

                                <div className={cn(s.modal__form_box)}>
                                    <label className={cn(s.modal__form_label)} htmlFor="">
                                        Оцените нашу работу
                                    </label>
                                    <Rating setRating={setRating} setError={setError} />
                                </div>
                                <PhoneNumber
                                    setErrorPhone={setErrorPhone}
                                    setPhone={setPhone}
                                    setError={setError}
                                    phone={phone}
                                    errorPhone={errorPhone}
                                />

                                <div className={cn(s.modal__form_error)}>{error && "Заполните все поля"}</div>
                                <Button animation disabled={error} onClick={sendApplication}>
                                    Опубликовать отзыв
                                </Button>
                            </>
                        ) : (
                            <p className={cn(s.modal__form_text)}> Спасибо за ваш отзыв, в ближайшее время мы его опубликуем😉</p>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default WriteRewiev;
