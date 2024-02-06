import React from "react";
import Layout from "@/app/components/layout/layout";
import s from "./page.module.scss";
import cn from "classnames";
import Image from "next/image";
import { IReview, arrRewiews } from "@/data";
import star from "@/public/star.svg";
import Link from "next/link";
import Button from "../components/Button";

export default async function Page() {
    return (
        <Layout>
            <section className={cn(s.section)}>
                <Link className={s.section__button} href="tel:+79602136949">
                    <Button>заказать замер</Button>
                </Link>
                <div  className={cn(s.section__box)}>
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
                                <p className={cn(s.section__card_text)}>{el.date}</p>
                                <p className={cn(s.section__card_text)}>{el.text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
}
