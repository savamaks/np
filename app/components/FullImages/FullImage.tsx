"use client";

import React, { useState } from "react";
import s from "./FullImage.module.scss";
import { IMouseEvent } from "@/app/types";
import Image from "next/image";
import Modal from "../Modal/Modal";
import { toBase64, shimmer } from "@/app/_handlerFunc/toBase64";

import { motion, Variants } from "framer-motion";


const cardVariants: Variants = {
    offscreen: {
        y: 100,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        rotate: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.8,
            bounce: 0.35
        },
    },
};
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
                        <motion.div className={s.block} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.3 }}>
                            <motion.div className={s.cont} variants={cardVariants}>
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
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </>
    );
};

export default FullImage;
