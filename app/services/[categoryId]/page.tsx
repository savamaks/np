import React from "react";
import Layout from "../../components/layout/layout";
import s from "./page.module.scss";
import Image from "next/image";
import Button from "../../components/Button/Button";
import { IData, IProduct, data } from "@/data";
import cn from "classnames";
import Link from "next/link";
import getBase64 from "@/app/_handlerFunc/getLocalBase64";
import { Metadata } from "next";
import FormTelegram from "@/app/components/FormTelegram/FormTelegram";

export const metadata: Metadata = {
    title: "Услуги",
};

//страница продукта
export default function Page({ params }: { params: { categoryId: string } }) {
    console.log(params.categoryId);
    return (
        <Layout>
            <main className={s.section}>
            <FormTelegram />

                {data.map((el: IData, index: number) => {
                    if (el.name !== params.categoryId) return;
                    return (
                        <>
                            <nav className={s.section__nav}>
                                <p>
                                    {<Link href="/services">Услуги</Link>}
                                    {" > "}
                                    {el.title}
                                </p>
                            </nav>
                            <h1 className={cn(s.section__title)}>{el.title}</h1>
                            {el.products.map(async (el: IProduct, index: number) => {
                                const myBlurDataUrl = await getBase64(`http://localhost:3030/${el.parentPath}/${el.name}/${el.images[0]}`);

                                return (
                                    <div key={index} className={s.card}>
                                        <Image
                                            className={s.card__image}
                                            src={`/${el.parentPath}/${el.name}/${el.images[0]}`}
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
                                            <Button path={`${el.parentPath}/product/${el.name}`} className={s.card__cont_button}>
                                                Подробнее
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    );
                })}
            </main>
        </Layout>
    );
}
