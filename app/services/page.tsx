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
import CardProduct from "../components/CardProduct/CardProduct";

const getData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/categories/?populate=*`, {
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
                        const myBlurDataUrl = await getBase64(`${process.env.NEXT_PUBLIC_SRC_STRAPI}` + `${el.attributes.image.data.attributes.formats.small.url}`);
                        return (
                            <CardProduct
                                key={index}
                                href={`/services/${el.attributes.title}`}
                                src={`${process.env.NEXT_PUBLIC_SRC_STRAPI}` + `${el.attributes.image.data.attributes.formats.small.url}`}
                                blur={myBlurDataUrl}
                                name={el.attributes.name}
                                description={el.attributes.description}
                            />
                        );
                    })}
                </div>
            </main>
        </>
    );
};

export default Services;
