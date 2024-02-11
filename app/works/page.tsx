"use client";
import React, { useState } from "react";
import s from "./page.module.scss";
import Image from "next/image";
import Layout from "../components/layout/layout";
import cn from "classnames";
import { toBase64, shimmer } from "../_handlerFunc/toBase64";
import Modal from "../components/Modal/Modal";
import { IImages,IMouseEvent } from "../types";
import { images } from "@/data";
import FormTelegram from "../components/FormTelegram/FormTelegram";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Наши работы",
    twitter: {
        card: "summary",
    },
};
const CatalogWork = () => {
    const [srcFullImage, setSrcFullImage] = useState("");

    const clickImage = (e: IMouseEvent) => {
        setSrcFullImage(e.target.id);
    };
    return (
        <Layout>
            <section className={cn(s.section)}>
            <FormTelegram />

                {srcFullImage !== "" && <Modal src={srcFullImage} setSrc={setSrcFullImage} />}

                <div className={s.section__box}>
                    {images.map((el: IImages, index: number) => {
                        return (
                            <Image
                                onClick={clickImage}
                                className={s.section__box_image}
                                key={index}
                                id={`/imagesWork/${el.src}`}
                                src={`/imagesWork/${el.src}`}
                                alt="workImage"
                                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(240, 180))}`}
                                width={400}
                                loading="lazy"
                                height={300}
                            />
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
};

export default CatalogWork;
