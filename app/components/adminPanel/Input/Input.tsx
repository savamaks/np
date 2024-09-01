import React, { ChangeEvent, FC } from "react";
import s from "./Input.module.scss";
import cn from "classnames";

interface IProps {
    className?: string;
    setValue: (value: string) => void;
    value: string;
    type?: string;
    name: string;
    title: string;
    types: "input" | "textarea";
}

const Input: FC<IProps> = ({ className, setValue, value, type, name, title, types }) => {
        return (
            <>
                <label htmlFor={name}>{title}</label>

                {types === "input" ? (
                    <input
                        name={name}
                        className={cn(s.input, className)}
                        type={type}
                        value={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setValue(e.target.value);
                        }}
                    />
                ) : (
                    <textarea
                    name={name}
                    className={cn(s.textarea, className)}
                        value={value}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setValue(e.target.value);
                        }}
                    />
                )}
            </>
        );
};

export default Input;
