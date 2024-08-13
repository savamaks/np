import React, { ChangeEvent, FC } from "react";

interface IProps {
    className: string;
    setValue: (value: string) => void;
    value: string;
    type: string;
    name: string;
    title: string;
}

const Input: FC<IProps> = ({ className, setValue, value, type, name, title }) => {
    if (type === "text")
        return (
            <>
                <label htmlFor={name}>{title}</label>
                <input
                    name={name}
                    className={className}
                    type={type}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setValue(e.target.value);
                    }}
                />
            </>
        );
};

export default Input;
