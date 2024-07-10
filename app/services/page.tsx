import React from "react";
import s from "./page.module.scss";
import Image from "next/image";
import cn from "classnames";
import getBase64 from "../_handlerFunc/getLocalBase64";
import { Metadata } from "next";
import FormTelegram from "../components/FormTelegram/FormTelegram";
import { ICategory } from "../types";
import ArrowUp from "../components/arrowUp/ArrowUp";
import Link from "next/link";
import Button from "../components/Button/Button";

const getData = async () => {
    try {
        const response = await fetch(`https://wclouds.ru/api/categories/?populate=*`, {
            method: "GET",
            next: {
                revalidate: 300,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
            },
        });
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const metadata: Metadata = {
    title: "Услуги",
    twitter: {
        card: "summary_large_image",
    },
};

//страница категории
const Services = async () => {
    const data = await getData();
    return (
        <>
            <main className={s.section}>
                <ArrowUp />
                <FormTelegram>Заявка на замер</FormTelegram>
                <h1 className={cn(s.section__title)}>Виды услуг</h1>
                <div className={s.section__box}>
                    {data.data.map(async (el: ICategory, index: number) => {
                        const myBlurDataUrl = await getBase64("https://wclouds.ru" + `${el.attributes.image.data.attributes.formats.small.url}`);

                        return (
                            <Link
                                key={index}
                                className={s.link}
                                href={el.attributes.products.data.length > 0 ? `/services/${el.attributes.title}` : ""}
                            >
                                <div className={cn(s.card)}>
                                    <Image
                                        className={s.card__image}
                                        src={"https://wclouds.ru" + `${el.attributes.image.data.attributes.formats.small.url}`}
                                        loading="lazy"
                                        width={400}
                                        height={300}
                                        alt="services"
                                        placeholder="blur"
                                        blurDataURL={myBlurDataUrl}
                                    />
                                    <div className={s.card__cont}>
                                        <h3 className={cn(s.card__cont_title)}>{el.attributes.name}</h3>
                                        <p className={s.card__cont_text}>{el.attributes.description}</p>
                                        {el.attributes.products.data.length > 0 && <Button>Подробнее</Button>}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </>
    );
};

export default Services;
