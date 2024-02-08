import React from "react";
import Layout from "../components/layout/layout";
import s from "./page.module.scss";
import Image from "next/image";
import Button from "../components/Button/Button";
import { IData, data } from "@/data";
import cn from "classnames";
import getBase64 from "../_handlerFunc/getLocalBase64";
import { Metadata } from "next";
import Link from "next/link";
import FormTelegram from "../components/FormTelegram/FormTelegram";

const getData = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return data;
};

export const metadata: Metadata = {
    title: "Услуги",
};

//страница категории
const Services = async () => {
    const data = await getData();
    return (
        <Layout>
            <main className={s.section}>
                <FormTelegram />

                <h1 className={cn(s.section__title)}>Виды услуг</h1>
                <div className={s.section__box}>
                    {data.map(async (el: IData, index: number) => {
                        const myBlurDataUrl = await getBase64(`http://localhost:3030/${el.name}/${el.image}`);

                        return (
                            <div key={index} className={cn(s.card)}>
                                <Image
                                    className={s.card__image}
                                    src={`/${el.name}/${el.image}`}
                                    loading="lazy"
                                    width={400}
                                    height={300}
                                    alt="services"
                                    placeholder="blur"
                                    blurDataURL={myBlurDataUrl}
                                />
                                <div className={s.card__cont}>
                                    <h3 className={cn(s.card__cont_title)}>{el.title}</h3>
                                    <p className={s.card__cont_text}>{el.description}</p>
                                    {el.products && el.products.length > 0 && (
                                        <Button path={el.name} className={s.card__cont_button}>
                                            Подробнее
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </Layout>
    );
};

export default Services;
