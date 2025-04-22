"use client";

import React, { FC, useState } from "react";
import s from "./FullImage.module.scss";
import { IDataImage, IMouseEvent } from "@/app/types";
import Image from "next/image";
import Modal from "../Modal/Modal";
import { toBase64, shimmer } from "@/app/_handlerFunc/toBase64";

interface IProps {
    images: Array<IDataImage>;
    
}
const FullImage: FC<IProps> = ({ images }) => {
    const [index, setIndex] = useState("");
    const clickImage = (e: IMouseEvent) => {
        setIndex(e.target.dataset.index);
    };
    return (
        <>
            {index !== "" && <Modal images={images} numIndex={index} setIndex={setIndex} />}
            <div className={s.box}>
                {images.map((el: IDataImage, index: number) => {
                    return (
                        <Image
                            onClick={clickImage}
                            className={s.box__image}
                            key={index}
                            data-index={index}
                            data-src={`${process.env.NEXT_PUBLIC_SRC_STRAPI}${el.url}`}
                            src={`${process.env.NEXT_PUBLIC_SRC_STRAPI}${el.url}`}
                            alt="workImage"
                            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(240, 180))}`}
                            width={400}
                            loading="lazy"
                            height={300}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default FullImage;
