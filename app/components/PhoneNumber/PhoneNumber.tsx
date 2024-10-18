import React, { ChangeEvent, FC, useState } from "react";
import InputMain from "../Input/InputMain";

interface IProps {
    setErrorPhone: (value: boolean) => void;
    setPhone: (value: string) => void;
    setError: (value: boolean) => void;
    phone: string;
    errorPhone: boolean;
}

const PhoneNumber: FC<IProps> = ({ setErrorPhone, setError, setPhone, phone, errorPhone }) => {
    const changePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorPhone(false);
        setError(false);
        const value = e.target.value;
        const str = value.replace(/[^0-9]/gi, "");
        const arrStr = str.split("");

        let redactStr = "";

        arrStr.map((el: string, index: number) => {
            if (index === 0) {
                redactStr = `+7 (`;
            }
            if (index >= 1 && index <= 3) {
                redactStr += el;
            }
            if (index === 4) {
                redactStr += `) ${el}`;
            }
            if (index >= 5 && index <= 6) {
                redactStr += el;
            }
            if (index === 7) {
                redactStr += `-${el}`;
            }
            if (index === 8) {
                redactStr += el;
            }
            if (index === 9) {
                redactStr += `-${el}`;
            }
            if (index === 10) {
                redactStr += el;
            }
        });
        if (value.length === 0) {
            redactStr = "";
        }

        setPhone(redactStr);
    };

    return (
        <>
            <InputMain
                error={errorPhone ? true : false}
                label="Телефон"
                typeInput="phone"
                value={phone}
                placeholder=""
                onChangeInput={changePhoneNumber}
            />
        </>
    );
};

export default PhoneNumber;
