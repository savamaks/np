import React, { FC } from "react";
import s from "./Request.module.scss";
import { IRequest } from "@/app/types";

interface IProps {
    data: Array<IRequest>;
}

const Request: FC<IProps> = ({ data }) => {
    return (
        <div className={s.container}>
            <div className={s.container__box}>
                <h2  className={s.container__box_request}> Вопрос</h2>
                <h2  className={s.container__box_text}>Ответ</h2>
            </div>
            {data.map((el: IRequest, index: number) => {
                return (
                    <div  key={index} className={s.container__card}>
                        <p className={s.container__card_request}> {el.attributes.request}</p>
                        <p className={s.container__card_text}> {el.attributes.answer}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Request;
