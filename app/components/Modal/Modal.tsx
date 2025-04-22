"use client";

import React, { FC, MouseEvent, useRef, useState } from "react";
import s from "./Modal.module.scss";
import Image from "next/image";
import { shimmer, toBase64 } from "@/app/_handlerFunc/toBase64";
import cn from "classnames";
import arrowForward from "@/public/arrowForward.svg";
import arrowBack from "@/public/arrowBack.svg";
import krestik from "@/public/krestik.svg";
import fScreen from "@/public/fullScreen.svg";
import miniScreen from "@/public/miniScreen.svg";
import zoomPlus from "@/public/zoomPlus.svg";
import zoomMinus from "@/public/zoomMinus.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IDataImage } from "@/app/types";

interface IModalProps {
    numIndex: string;
    setIndex: (string: string) => void;
    images: Array<IDataImage>;
}

const Modal: FC<IModalProps> = ({ numIndex, setIndex, images }) => {
    const refName = useRef<HTMLDivElement>(null);
    const [screen, setScreen] = useState(false);
    const [count, setCount] = useState(+numIndex);
    const closeModal = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.stopPropagation();
        setIndex("");
    };
    const clickImage = (e: MouseEvent<HTMLImageElement | HTMLDivElement>) => {
        e.stopPropagation();
        if (count === images.length - 1) {
            setCount(0);
        } else {
            setCount(count + 1);
        }
    };

    const fullScreen = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (refName.current !== null && screen) {
            setScreen(false);
            const doc: any = document;
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
        } else if (refName.current !== null) {
            setScreen(true);

            refName.current.requestFullscreen();
        }
    };
    const arrowLeft = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (count === 0) {
            setCount(images.length - 1);
        } else {
            setCount(count - 1);
        }
    };
    const arrowRight = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        e.preventDefault();
        if (count === images.length - 1) {
            setCount(0);
        } else {
            setCount(count + 1);
        }
    };

    return (
        <div onClick={closeModal} ref={refName} className={s.modal}>
            {images.map((el: IDataImage, index: number) => {
                if (index !== count) return;
                return (
                    
                    <TransformWrapper key={index} initialScale={1} initialPositionX={0} initialPositionY={0}>
                        {({ zoomIn, zoomOut }) => (
                            <>
                                <div className={s.modal__box}>
                                    <p className={s.modal__box_count}>
                                        {count + 1}/{images.length}
                                    </p>
                                    <button onClick={fullScreen} className={s.modal__box_close}>
                                        <Image src={screen ? miniScreen : fScreen} alt="fullScreen" width={20} height={20} />
                                    </button>

                                    <button
                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            zoomIn();
                                        }}
                                        className={s.modal__box_close}
                                    >
                                        <Image src={zoomPlus} alt="ZoomPlus" width={20} height={20} />
                                    </button>
                                    <button
                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            zoomOut();
                                        }}
                                        className={s.modal__box_close}
                                    >
                                        <Image src={zoomMinus} alt="ZoomMinus" width={20} height={20} />
                                    </button>
                                    <button onClick={closeModal} className={s.modal__box_close}>
                                        <Image src={krestik} alt="Close" width={20} height={20} />
                                    </button>
                                </div>

                                <div
                                    onClick={(e: MouseEvent<HTMLDivElement>) => {
                                        e.stopPropagation();
                                    }}
                                    className={s.modal__cont}
                                >
                                    <button onClick={arrowLeft} className={cn(s.modal__cont_arrow, s.modal__cont_left)}>
                                        <Image src={arrowBack} alt="forward" width={30} height={30} />
                                    </button>
                                    <TransformComponent>
                                        <Image
                                            key={index}
                                            onClick={clickImage}
                                            className={cn(s.modal__cont_image)}
                                            src={`${process.env.NEXT_PUBLIC_SRC_STRAPI}${el.url}`}
                                            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(200, 100))}`}
                                            alt="fullImage"
                                            width={3000}
                                            height={4000}
                                        />
                                    </TransformComponent>
                                    <button onClick={arrowRight} className={cn(s.modal__cont_arrow, s.modal__cont_right)}>
                                        <Image src={arrowForward} alt="forward" width={30} height={30} />
                                    </button>
                                </div>
                            </>
                        )}
                    </TransformWrapper>
                );
            })}
        </div>
    );
};
export default Modal;
