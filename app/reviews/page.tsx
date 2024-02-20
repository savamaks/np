import React from "react";
import Layout from "@/app/components/layout/layout";
import s from "./page.module.scss";
import cn from "classnames";
import Image from "next/image";
import star from "@/public/star.svg";
import FormTelegram from "../components/FormTelegram/FormTelegram";
import { Metadata } from "next";
import WriteRewiev from "../components/WriteRewiev/WriteRewiev";
import { correctDate } from "../_handlerFunc/correctDate";

interface IDataRewive {
    id: number;
    attributes: {
        name: string;
        text: string;
        date: string;
        rating: string;
        createdAt: string;
        published: boolean;
    };
}
interface IData {
    data: Array<IDataRewive>;
}
const getData = async () => {
    try {
        const res = await fetch(`https://wclouds.ru/api/rewiews`, {
            method: "GET",
            next: {
                revalidate: 0,
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
export const metadata: Metadata = {
    title: "Отзывы",
    twitter: {
        card: "summary",
    },
};
const ReviewsPage = async () => {
    const data: IData = await getData();
    return (
        <Layout>
            <section className={cn(s.section)}>
                <div className={cn(s.section__box)}>
                    <FormTelegram />
                    <WriteRewiev />
                </div>

                <div className={cn(s.section__box)}>
                    {data.data.map((el: IDataRewive, index: number) => {
                        if (!el.attributes.published) return;

                        let arrStar = [];
                        for (let i = 0; i < +el.attributes.rating; i++) {
                            arrStar.push(i);
                        }

                        const correctName = el.attributes.name
                            .split(" ")
                            .map((el: string) => el[0].toUpperCase() + el.slice(1))
                            .join(" ");

                        let date: string = "";

                        if (el.attributes.date !== null) {
                            date = correctDate(el.attributes.date);
                        } else {
                            date = correctDate(el.attributes.createdAt.slice(0, 10));
                        }

                        return (
                            <div key={index} className={cn(s.section__card)}>
                                <h1 className={cn(s.section__card_title)}>{correctName}</h1>

                                <div className={cn(s.section__card_box)}>
                                    {arrStar.map((index: number) => {
                                        return <Image key={index} src={star} alt="star" width={20} height={20} />;
                                    })}
                                </div>
                                <p className={cn(s.section__card_text, s.date)}>{date}</p>
                                <p className={cn(s.section__card_text)}>{el.attributes.text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
};
export default ReviewsPage;
