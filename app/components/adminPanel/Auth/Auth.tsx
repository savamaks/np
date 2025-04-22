"use client";
import React, { useState, MouseEvent, ChangeEvent } from "react";
import s from "./Auth.module.scss";
import Button from "../../Button/Button";
import { authAdmin } from "@/app/_handlerFunc/admin/authAdmin";
import { useRouter } from "next/navigation";
import { useStore } from "../../store/useStore";
import InputMain from "../../Input/InputMain";

const Auth = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [active, setActive] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();
    const { authService } = useStore();

    const sendForm = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = await authAdmin({ identifier: name, password });

        if (data === 400) {
            setError(true);
        } else if (data.jwt) {
            authService.authorization(true, data.jwt);
            setName("");
            setPassword("");
            router.push("/admin/categories");
        }
    };

    return (
        <form className={s.container}>
            <InputMain
                error={error}
                label="Логин"
                typeInput="text"
                placeholder=""
                onChangeInput={(e: ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                    setError(false);
                    if (e.target.value !== "" && password !== "") {
                        setActive(true);
                    } else {
                        setActive(false);
                    }
                }}
            />
            <InputMain
                error={error}
                label="Пароль"
                typeInput="password"
                placeholder=""
                onChangeInput={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                    setError(false);

                    if (name !== "" && e.target.value !== "") {
                        setActive(true);
                    } else {
                        setActive(false);
                    }
                }}
            />

            <Button onClick={sendForm} disabled={!active}>
                Войти
            </Button>
        </form>
    );
};
export default Auth;
