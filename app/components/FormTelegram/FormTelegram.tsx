"use client";

import React, { useState, MouseEvent, ChangeEvent, useEffect, useRef, FC, ReactNode } from "react";
import s from "./FormTelegram.module.scss";
import cn from "classnames";
import { TelegramBotRequest } from "@/app/_handlerFunc/telegramBot";
import Image from "next/image";
import krestik from "@/public/krestik.svg";
import Button from "../Button/Button";
import InputMain from "../Input/InputMain";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import { validPhone } from "@/app/_handlerFunc/validPhone";

interface IProps {
    children: ReactNode;
    type?: "click" | "button";
    textSale?: string;
}
const FormTelegram: FC<IProps> = ({ children, type, textSale }) => {
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [adress, setAdress] = useState("");
    const [description, setDescription] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState(false);
    const [result, setResult] = useState<boolean | undefined>(false);
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
    const changeAdress = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAdress(e.target.value);
        setError(false);
    };

    const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setDescription(e.target.value);
        setError(false);
    };

    const sendApplication = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (name === "" || adress === "" || phone === "" || description === "") {
            setError(true);
            if (validPhone(phone)) {
                setErrorPhone(true);
            }
            return;
        }
        const res = await TelegramBotRequest({ name, adress, description, textSale, phone: `${phone}` });
        setResult(res);
    };
    useEffect(() => {
        if (result) {
            const timer = setTimeout(() => {
                if (active) {
                    setActive(false);
                }
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
            <Button type={type} onClick={clickActive}>
                {children}
            </Button>
            {active && (
                <div onClick={clickActive} className={cn(s.modal)}>
                    <form
                        onClick={(e: MouseEvent<HTMLFormElement>) => {
                            e.stopPropagation();
                        }}
                        className={cn(s.modal__form)}
                    >
                        <button className={cn(s.modal__form_close)} onClick={clickActive}>
                            <Image src={krestik} alt="close" width={18} height={18} />
                        </button>
                        {textSale && !result && (
                            <>
                                <p>Акция:</p>
                                <p className={cn(s.modal__form_sale)}>{textSale}</p>
                            </>
                        )}

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
                                    error={error && adress === "" ? true : false}
                                    label="Адрес"
                                    typeInput="text"
                                    placeholder=""
                                    onChangeInput={changeAdress}
                                />
                                <InputMain
                                    error={error && description === "" ? true : false}
                                    label="Описание"
                                    typeInput="textarea"
                                    placeholder=""
                                    onChangeTextarea={changeDescription}
                                />
                                <PhoneNumber setErrorPhone={setErrorPhone} setPhone={setPhone} setError={setError} phone={phone} errorPhone={errorPhone} />

                                <div className={cn(s.modal__form_error)}>{error && "Заполните все поля"}</div>
                                <Button animation disabled={error} onClick={sendApplication}>
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
