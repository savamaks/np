import React from "react";
import Layout from "../components/layout/layout";
import s from "./page.module.scss";
import Image from "next/image";
import Button from "../components/Button/Button";
import cn from "classnames";
import getBase64 from "../_handlerFunc/getLocalBase64";
import { Metadata } from "next";
import FormTelegram from "../components/FormTelegram/FormTelegram";
import { ICategory } from "../types";


const getData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/categories/?populate=*`, {
            method: "GET",
            next:{
                revalidate:0
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
        card: "summary",
    },
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
                    {data.data.map(async (el: ICategory, index: number) => {

                      const myBlurDataUrl = await getBase64(process.env.NEXT_PUBLIC_SRC_STRAPI+`${el.attributes.image.data.attributes.url}`);
                        
                        
                        return (
                            <div key={index} className={cn(s.card)}>
                            
                                <Image
                                    className={s.card__image}
                                    src={process.env.NEXT_PUBLIC_SRC_STRAPI+`${el.attributes.image.data.attributes.url}`}
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
                                    {el.attributes.products.data.length > 0 && (
                                        <Button path={el.attributes.title} className={s.card__cont_button}>
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
