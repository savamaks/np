import React, { FC, MouseEvent } from "react";
import s from "./Request.module.scss";
import { IRequest } from "@/app/types";
import { useRouter } from "next/navigation";
import cn from "classnames";

interface IProps {
    data: Array<IRequest>;
}

const Request: FC<IProps> = ({ data }) => {
    const router = useRouter();
    return (
        <div className={s.container}>
            <div className={s.container__box}>
                <h2 className={s.container__box_request}> Вопрос</h2>
                <h2 className={s.container__box_text}>Ответ</h2>
            </div>
            {data.map((el: IRequest, index: number) => {
                return (
                    <div
                        onClick={(e: MouseEvent<HTMLDivElement>) => {
                            e.preventDefault();
                            router.push(`requests/${el.id}`);
                        }}
                        key={index}
                        className={s.container__card}
                    >
                        <div className={s.container__card_box}>
                            <p className={s.container__card_request}> {el.request}</p>
                            <p
                                className={cn(
                                    s.container__card_public,
                                    el.publishedAt === null ? s.container__card_draft : s.container__card_published
                                )}
                            >
                                {el.publishedAt === null ? "Неопубликован" : "Опубликован"}
                            </p>
                        </div>
                        <p className={s.container__card_text}> {el.answer}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Request;
