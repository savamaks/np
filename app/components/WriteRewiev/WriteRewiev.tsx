"use client";

import React, { useState, MouseEvent, ChangeEvent, useEffect, useRef } from "react";
import s from "./WriteRewiev.module.scss";
import cn from "classnames";
import { TelegramBotRewievs } from "@/app/_handlerFunc/telegramBot";
import Image from "next/image";
import krestik from "@/public/krestik.svg";
import PhoneInput from "react-phone-input-2";
import Rating from "../rating/Rating";
import { createRewiev } from "@/app/_handlerFunc/createRewiev";
import Button from "../Button/Button";

const WriteRewiev = () => {
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [rewiev, setRewiev] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState<boolean | undefined>(false);
    const [valid, setValid] = useState(true);
    const [rating, setRating] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const validatePhone = (input: string) => {
        const phonePatern = /^\d{11}$/;
        return phonePatern.test(input);
    };

    const changeNumber = (value: string) => {
        setPhone(value);
        setValid(validatePhone(value));
        setError("");
    };
    const clickActive = () => {
        setActive((prev) => !prev);
    };

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value);
        setError("");
    };
    const changeRewiev = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setRewiev(e.target.value);
        setError("");
    };

    const sendApplication = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (name === "" || rewiev === "" || phone === "" || !valid || rating === "") {
            setError("Заполните все поля ввода");
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
                                <div title="Введите свое имя..." className={cn(s.modal__form_box)}>
                                    <label className={cn(s.modal__form_label)} htmlFor="">
                                        Имя
                                    </label>
                                    <input
                                        ref={inputRef}
                                        value={name}
                                        onChange={changeName}
                                        className={cn(s.modal__form_input)}
                                        type="text"
                                        placeholder="Введите свое имя..."
                                    />
                                </div>
                                <div title="Будем благодарны за ваш отзыв!" className={cn(s.modal__form_box)}>
                                    <label className={cn(s.modal__form_label)} htmlFor="">
                                        Отзыв
                                    </label>
                                    <textarea
                                        value={rewiev}
                                        onChange={changeRewiev}
                                        className={cn(s.modal__form_textArea, s.review)}
                                        placeholder="Напишите отзыв..."
                                    />
                                </div>
                                <div className={cn(s.modal__form_box)}>
                                    <label className={cn(s.modal__form_label)} htmlFor="">
                                        Оцените нашу работу
                                    </label>
                                    <Rating setRating={setRating} setError={setError} />
                                </div>
                                <div title="Введите номер телефона..." className={cn(s.modal__form_box)}>
                                    <label className={cn(s.modal__form_label)} htmlFor="">
                                        Телефон
                                        <PhoneInput
                                            specialLabel=""
                                            disableCountryGuess
                                            inputClass={cn(s.modal__form_input)}
                                            country="ru"
                                            value={phone}
                                            onChange={changeNumber}
                                            placeholder="+7 (900) 123-45-67"
                                        />
                                    </label>
                                </div>

                                <div className={cn(s.modal__form_error)}>{error}</div>
                                <Button animation disabled={error !== "" && true} onClick={sendApplication}>
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
