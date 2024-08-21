import React, { FC, MouseEvent } from "react";
import s from "./Confirmation.module.scss";
import Button from "../../Button/Button";
import Modal from "../Modal/Modal";

interface IProps {
    active: boolean;
    setActive: (value: boolean) => void;
    functionConfirmation: (value: MouseEvent<HTMLButtonElement>) => void;
    text: string;
}

const Confirmation: FC<IProps> = ({ active, setActive, functionConfirmation, text }) => {
    return (
        <Modal
            active={active}
            onClick={() => {
                setActive(false);
            }}
        >
            <div
                className={s.confirmation}
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                }}
            >
                <p>{text}</p>
                <div className={s.confirmation__box}>
                    <Button onClick={functionConfirmation}>ok</Button>
                    <Button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();

                            setActive(false);
                        }}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default Confirmation;
