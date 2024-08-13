"use client";
import React, { useState, MouseEvent, ChangeEvent } from "react";
import s from "./Auth.module.scss";
import Button from "../../Button/Button";
import { authAdmin } from "@/app/_handlerFunc/admin/authAdmin";
import { useRouter } from "next/navigation";
import { useStore } from "../../store/useStore";

const Auth = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [active, setActive] = useState(false);
    const router = useRouter();
    const { authService } = useStore();

    const sendForm = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = await authAdmin({ identifier: name, password });
        if (data.jwt) {
            authService.authorization(true, data.jwt);
            router.push("/admin/categories");
        }
    };

    return (
        <form className={s.container}>
            <div className={s.container__box}>
                <label className={s.container__label} htmlFor="">
                    Логин
                </label>
                <input
                    className={s.container__input}
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setName(e.target.value);
                        if (e.target.value !== "" && password !== "") {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }}
                />
            </div>
            <div className={s.container__box}>
                <label className={s.container__label} htmlFor="">
                    Пароль
                </label>
                <input
                    className={s.container__input}
                    type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                        if (name !== "" && e.target.value !== "") {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }}
                />
            </div>
            <Button onClick={sendForm} disabled={!active}>
                Войти
            </Button>
        </form>
    );
};
export default Auth;
