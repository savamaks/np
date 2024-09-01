import React from "react";
import s from "./page.module.scss";
import cn from "classnames";
import Image from "next/image";
import photo from "@/public/1.jpg";
import Advantage from "./components/advantages/Advantage";
import FormTelegram from "./components/FormTelegram/FormTelegram";
import ArrowUp from "./components/arrowUp/ArrowUp";
import ServicesData from "./components/ServicesData/ServicesData";
import Sales from "./components/Sales/Sales";
import MainListRequest from "./components/LIstRequest/MainListRequest";

const getData = async () => {
    try {
        const res = await fetch(`https://wclouds.ru/api/main`, {
            method: "GET",
            next: {
                revalidate: 300,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
            },
        });
        const data = res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Home = async () => {
    const data = await getData();

    return (
        <>
            <main className={s.main}>
                <ArrowUp />

                <section className={s.section}>
                    <Image className={s.section__image} src={photo} alt="image" width={1200} height={900} placeholder="blur" />

                    <div className={s.cont}>
                        <div className={cn(s.section__block)}>
                            <h1 className={cn(s.section__title)}>Натяжные</h1>
                            <h1 className={cn(s.section__title)}>Потолки</h1>
                        </div>

                        <p className={s.section__text}>{data.data.attributes.text}</p>

                        <FormTelegram>Заявка на замер</FormTelegram>
                    </div>
                </section>
                <Advantage />
                <ServicesData />
                <Sales />
                <MainListRequest />
            </main>
        </>
    );
};
export default Home;
