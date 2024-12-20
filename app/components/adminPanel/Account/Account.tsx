"use client";
import React, { ChangeEvent, useState } from "react";
import s from "./Account.module.scss";
import Input from "@/app/components/adminPanel/Input/Input";
import InputMain from "@/app/components/Input/InputMain";
import { error } from "console";
import Button from "@/app/components/Button/Button";

const Account = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [active, setActive] = useState(false);
    const [error, setError] = useState(false);
    return (
        <section className={s.section}>
            <h2 className={s.section__title}>Личный кабинет</h2>
            <div className={s.section__cont}>
                <InputMain
                    error={error}
                    label="Имя"
                    typeInput="text"
                    placeholder=""
                    onChangeInput={(e: ChangeEvent<HTMLInputElement>) => {
                        setName(e.target.value);
                    }}
                />
                <form className={s.section__form}>
                    <p>Смена пароля:</p>
                    <InputMain
                        error={error}
                        label="Пароль"
                        typeInput="password"
                        placeholder=""
                        onChangeInput={(e: ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <InputMain
                        error={error}
                        label="Новый Пароль"
                        typeInput="password"
                        placeholder=""
                        onChangeInput={(e: ChangeEvent<HTMLInputElement>) => {
                            setNewPassword(e.target.value);
                        }}
                    />
                    <Button type="noBorder">Сменить пароль</Button>
                </form>
            </div>
        </section>
    );
};

export default Account;
