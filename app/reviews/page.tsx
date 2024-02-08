import React from "react";
import Layout from "@/app/components/layout/layout";
import s from "./page.module.scss";
import cn from "classnames";
import Image from "next/image";
import { IReview, arrRewiews } from "@/data";
import star from "@/public/star.svg";
import Link from "next/link";
import FormTelegram from "../components/FormTelegram/FormTelegram";

export default async function Page() {
    return (
        <Layout>
            <section className={cn(s.section)}>
                <FormTelegram />

                <div className={cn(s.section__box)}>
                    {arrRewiews.map((el: IReview, index: number) => {
                        return (
                            <div key={index} className={cn(s.section__card)}>
                                <h1 className={cn(s.section__card_title)}>{el.name}</h1>

                                <div className={cn(s.section__card_box)}>
                                    <Image src={star} alt="star" width={20} height={20} />
                                    <Image src={star} alt="star" width={20} height={20} />
                                    <Image src={star} alt="star" width={20} height={20} />
                                    <Image src={star} alt="star" width={20} height={20} />
                                    <Image src={star} alt="star" width={20} height={20} />
                                </div>
                                <p className={cn(s.section__card_text, s.date)}>{el.date}</p>
                                <p className={cn(s.section__card_text)}>{el.text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
}
