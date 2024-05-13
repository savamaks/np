"use client";

import React, { useState, MouseEvent, ChangeEvent, useEffect } from "react";
import s from "./FormTelegram.module.scss";
import cn from "classnames";
import { TelegramBotRequest } from "@/app/_handlerFunc/telegramBot";
import Image from "next/image";
import krestik from "@/public/krestik.svg";
import PhoneInput from "react-phone-input-2";
import Button from "../Button/Button";

const FormTelegram = () => {
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState<boolean | undefined>(false);
    const [valid, setValid] = useState(true);

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
    const changeAdress = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAdress(e.target.value);
        setError("");
    };
    const changePhone = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPhone(e.target.value);
        setError("");
    };

    const sendApplication = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (name === "" || adress === "" || phone === "" || !valid) {
            setError("Заполните все поля ввода");
            return;
        }

        const res = await TelegramBotRequest({ name, adress, phone: `+${phone}` });

        setResult(res);
    };
    useEffect(() => {
        if (result) {
            const timer = setTimeout(() => {
                clickActive();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [result]);

    return (
        <div className={cn(s.container)}>
            <Button onClick={clickActive}>Заявка на замер</Button>
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
                                <div className={cn(s.modal__form_box)}>
                                    <label className={cn(s.modal__form_label)} htmlFor="">
                                        Имя
                                    </label>
                                    <input
                                        value={name}
                                        onChange={changeName}
                                        className={cn(s.modal__form_input)}
                                        type="text"
                                        placeholder="Введите свое имя..."
                                    />
                                </div>
                                <div className={cn(s.modal__form_box)}>
                                    <label className={cn(s.modal__form_label)} htmlFor="">
                                        Адрес
                                    </label>
                                    <input
                                        value={adress}
                                        onChange={changeAdress}
                                        className={cn(s.modal__form_input)}
                                        type="text"
                                        placeholder="Введите адрес: город, улица, дом, кв..."
                                    />
                                </div>
                                <div className={cn(s.modal__form_box)}>
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
                                    Отправить заявку
                                </Button>
                            </>
                        ) : (
                            <p className={cn(s.modal__form_text)}> Спасибо за ваше обращение, в ближайшее время с вами свяжутся 😉</p>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default FormTelegram;
