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
    animation?: boolean;
    type?: "button" | "click" | "noBorder" | "wave";
}

const Button: FC<IButton> = ({ animation, children, className, onClick, disabled, type }) => {
    const style = animation ? { animation: "none" } : {};
    return (
        <button
            style={style}
            disabled={disabled}
            onClick={onClick}
            className={cn(s.button, type === "noBorder" ? s.border : "", type === "click" ? s.click : "", className, type === "wave" ? s.border : "")}
        >
            {children}
        </button>
    );
};

export default Button;
