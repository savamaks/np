import React, { FC, MouseEvent } from "react";
import s from "./Modal.module.scss";
import Image from "next/image";
import { shimmer, toBase64 } from "@/app/_handlerFunc/toBase64";
import krestik from "@/public/krestik.svg";

interface IModalProps {
    src: string;
    setSrc: (string: string) => void;
}

const Modal: FC<IModalProps> = ({ src, setSrc }) => {
    const closeModal = () => {
        setSrc("");
    };
    const clickImage = (e: MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
    };
    
    return (
        <div onClick={closeModal} className={s.modal}>
            <Image onClick={closeModal} className={s.modal_close} src={krestik} alt="крестик" width={30} height={30} />
            <Image
                onClick={clickImage}
                className={s.modal_image}
                src={`${src}`}
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                alt="fullImage"
                width={4000}
                height={4000}
            />
        </div>
    );
};
export default Modal;
