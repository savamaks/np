"use client";

import React, { FC, ChangeEvent } from "react";
import s from "./Rating.module.scss";

interface IPrors {
    setRating: (value: string) => void;
    setError: (value: string) => void;
}
const Rating: FC<IPrors> = ({ setRating, setError }) => {
    const changeRating = (e: ChangeEvent<HTMLInputElement>) => {
        setRating(e.target.value);
        setError("");
    };

    return (
        <div className={s.rating} title="Пожалуйста оцените нашу работу)">
            <div className={s.rating__items}>
                <input onChange={changeRating} className={s.rating__items_input} type="radio" id="raiting__five" name="rating" value={5} />
                <label className={s.rating__items_label} htmlFor="raiting__five"></label>

                <input onChange={changeRating} className={s.rating__items_input} type="radio" id="raiting__four" name="rating" value={4} />
                <label className={s.rating__items_label} htmlFor="raiting__four"></label>

                <input onChange={changeRating} className={s.rating__items_input} type="radio" id="raiting__three" name="rating" value={3} />
                <label className={s.rating__items_label} htmlFor="raiting__three"></label>

                <input onChange={changeRating} className={s.rating__items_input} type="radio" id="raiting__two" name="rating" value={2} />
                <label className={s.rating__items_label} htmlFor="raiting__two"></label>

                <input onChange={changeRating} className={s.rating__items_input} type="radio" id="raiting__one" name="rating" value={1} />
                <label className={s.rating__items_label} htmlFor="raiting__one"></label>
            </div>
        </div>
    );
};

export default Rating;
