import React, { FC, ChangeEvent } from "react";
import s from "./InputMain.module.scss";
import cn from "classnames";

interface IInputMain {
    error?: boolean;
    onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeTextarea?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    changeNumber?: (value: string) => void;
    label: string;
    typeInput: "text" | "password" | "textarea" | "phone";
    placeholder: string;
    value?: string;
}
const InputMain: FC<IInputMain> = ({ value, error, changeNumber, onChangeInput, onChangeTextarea, label, placeholder, typeInput }) => {
    return (
        <div className={s.container}>
            {typeInput === "textarea" ? (
                <textarea
                    className={cn(s.container__input, s.container__textarea, error ? s.container__error : "")}
                    placeholder={placeholder}
                    onChange={onChangeTextarea}
                ></textarea>
            ) : (
                <input
                    className={cn(s.container__input, error ? s.container__error : "")}
                    placeholder={placeholder}
                    type={typeInput}
                    onChange={onChangeInput}
                />
            )}

            <label className={s.container__label} htmlFor="">
                {label}
            </label>
        </div>
    );
};

export default InputMain;
