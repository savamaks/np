"use client";

import { useResize } from "@/app/Hooks/useResize";
import { IDataImage, IMouseEvent } from "@/app/types";
import React, { FC, useState } from "react";
import Image from "next/image";
import s from "./SliderCont.module.scss";
import { toBase64, shimmer } from "@/app/_handlerFunc/toBase64";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "../Modal/Modal";

interface IProps {
    el: Array<IDataImage>;
}

const SliderCont: FC<IProps> = ({ el }) => {
    const { size } = useResize();
    const [index, setIndex] = useState("");
    console.log(size);
    const settings = {
        // dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: size ? 3 : 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        autoplay: true,
    };
    const clickImage = (e: IMouseEvent) => {
        setIndex(e.target.dataset.index);
    };

    return (
        <div className={s.slider}>
            {index !== "" && <Modal images={el} numIndex={index} setIndex={setIndex} />}

            <Slider {...settings}>
                {el.map((image: IDataImage, index: number) => {
                    return (
                        <div key={index} className={s.slider_box}>
                            <Image
                                onClick={clickImage}
                                data-index={index}
                                data-src={`${process.env.NEXT_PUBLIC_SRC_STRAPI}${image.url}`}
                                id={`${process.env.NEXT_PUBLIC_SRC_STRAPI}${image.url}`}
                                className={s.slider_image}
                                src={`${process.env.NEXT_PUBLIC_SRC_STRAPI}${image.url}`}
                                alt="img"
                                width={300}
                                height={225}
                                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(20, 15))}`}
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default SliderCont;
