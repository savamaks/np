"use client";
import React, { FC, ReactNode, MouseEvent } from "react";
import s from "./Button.module.scss";
import cn from "classnames";

interface IButton {
    children: ReactNode;
    path?: string;
    className?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const Button: FC<IButton> = ({ children, className, onClick, disabled }) => {
    return (
        <button disabled={disabled} onClick={onClick} className={cn(className, s.button)}>
            {children}
        </button>
    );
};

export default Button;
