"use client";

import React, { useState } from "react";
import s from "./FullImage.module.scss";
import { IMouseEvent} from "@/app/types";
import Image from "next/image";
import Modal from "../Modal/Modal";
import { toBase64, shimmer } from "@/app/_handlerFunc/toBase64";

const FullImage = ({ images }: any) => {
    const [srcFullImage, setSrcFullImage] = useState("");
    const clickImage = (e: IMouseEvent) => {
        setSrcFullImage(e.target.id);
    };
    return (
        <>
            {srcFullImage !== "" && <Modal src={srcFullImage} setSrc={setSrcFullImage} />}
            <div className={s.box}>
                {images.data.map((el: any, index: number) => {
                    return (
                       
                            <Image
                                onClick={clickImage}
                                className={s.box__image}
                                key={index}
                                id={`${process.env.NEXT_PUBLIC_SRC_STRAPI}${el.attributes.url}`}
                                src={`${process.env.NEXT_PUBLIC_SRC_STRAPI}${el.attributes.url}`}
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
