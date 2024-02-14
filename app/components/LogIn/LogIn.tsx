"use client";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import s from "./LogIn.module.scss";
import cn from "classnames";
import { logIn } from "@/app/_handlerFunc/logIn";

const LogIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [log, setLog] = useState({ token: "", error: false });

    const changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
        setError("");
    };
    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };

    const clickLogin = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (login === "" || password === "") {
            return setError("Введите корректные данные");
        }
        const r = await logIn(login, password);
        console.log(r);
    };
    return (
        <form action="" className={cn(s.form)}>
            <label className={cn(s.form__label)} htmlFor="">
                Логин
            </label>
            <input className={cn(s.form__input)} type="text" placeholder="Введите логин..." value={login} onChange={changeLogin} />
            <label className={cn(s.form__label)} htmlFor="">
                Пароль
            </label>
            <input className={cn(s.form__input)} type="password" placeholder="Введите пароль..." value={password} onChange={changePassword} />
            <div className={cn(s.form__error)}>
                <p>{error}</p>
            </div>
            <button onClick={clickLogin} className={cn(s.form__button)}>
                Войти
            </button>
        </form>
    );
};

export default LogIn;
