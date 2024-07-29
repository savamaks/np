import React, { ReactNode, FC, MouseEvent } from "react";
import s from "./Modal.module.scss";
import cn from "classnames";

interface IProps {
    children: ReactNode;
    active: boolean;
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const Modal: FC<IProps> = ({ children, active, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={cn(s.modal, active ? s.active : "")}
        >
            {children}
        </div>
    );
};

export default Modal;
