import React, { FC, MouseEvent } from "react";
import s from "./Confirmation.module.scss";
import Button from "../../Button/Button";
import Modal from "../Modal/Modal";
import Image from "next/image";
import loader from "@/public/tube-spinner.svg";

interface IProps {
    active: boolean;
    setActive: (value: boolean) => void;
    functionConfirmation: (value: MouseEvent<HTMLButtonElement>) => void;
    text: string;
    loading?: boolean;
}

const Confirmation: FC<IProps> = ({ active, setActive, functionConfirmation, text, loading }) => {
    return (
        <Modal
            active={active}
            onClick={() => {
                if (!loading) {
                    setActive(false);
                }
            }}
        >
            {loading ? (
                <div className={s.loader}>
                    <Image src={loader} alt="loader" width={100} height={100} />
                    <p>Загрузка...</p>
                </div>
            ) : (
                <div
                    className={s.confirmation}
                    onClick={(e: MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation();
                    }}
                >
                    <>
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
                    </>
                </div>
            )}
        </Modal>
    );
};

export default Confirmation;
