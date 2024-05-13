"use client";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, MouseEvent } from "react";
import s from "./Button.module.scss";
import cn from "classnames";

interface IButton {
    children: ReactNode;
    path?: string;
    className?: string;
    onClick?: () => void;
}

const Button: FC<IButton> = ({ children, className, path }) => {
    const router = useRouter();

    const clickCard = (e: MouseEvent<HTMLButtonElement>) => {
        if (path) {
            router.push(`/services/${path}`);
        }
    };
    return (
        <button onClick={clickCard} className={cn(className, s.button)}>
            {children}
        </button>
    );
};

export default Button;
