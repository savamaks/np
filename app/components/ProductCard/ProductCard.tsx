"use client";

import React, { MouseEvent, useState } from "react";
import Image from "next/image";
import s from "./ProductCard.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cn from "classnames";
import Link from "next/link";
import { toBase64, shimmer } from "@/app/_handlerFunc/toBase64";
import { useResize } from "@/app/Hooks/useResize";
import Modal from "../Modal/Modal";
import { IMouseEvent } from "@/app/types";

const ProductCard = ({ el }: any) => {
    const { size } = useResize();
    const [srcFullImage, setSrcFullImage] = useState("");

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
        setSrcFullImage(e.target.id);
    };

    return (
        <section className={s.section}>
            {srcFullImage !== "" && <Modal src={srcFullImage} setSrc={setSrcFullImage} />}
            <nav className={s.section__nav}>
                <p>
                    {<Link href="/services">Услуги</Link>}
                    {" > "}
                    {<Link href={`/services/${el.parentPath}`}>{el.parentName}</Link>}
                    {" > "}
                    {el.title}
                </p>
            </nav>
            <h1 className={cn(s.section__title)}>{el.title}</h1>
            <div className={s.section__cont}>
                <Image
                    className={s.section__cont_image}
                    src={`/${el.parentPath}/${el.name}/${el.images[0]}`}
                    alt="img"
                    width={600}
                    height={450}
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(100, 75))}`}
                />
                <p className={s.section__cont_text}>{el.description}</p>
            </div>
            <Link className={s.section__button} href="tel:+79602136949">
                <button>заказать замер</button>
            </Link>
            <h1 className={cn(s.section__title)}>Галерея</h1>
            <div className={s.section__slider}>
                <Slider {...settings}>
                    {el.images.map((image: string, index: number) => {
                        return (
                            <div key={index} className={s.section__slider_box}>
                                
                                <Image
                                    onClick={clickImage}
                                    id={`/${el.parentPath}/${el.name}/${image}`}
                                    className={s.section__slider_image}
                                    src={`/${el.parentPath}/${el.name}/${image}`}
                                    alt="img"
                                    width={300}
                                    height={225}
                                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(2000, 1500))}`}
                                />
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </section>
    );
};

export default ProductCard;
