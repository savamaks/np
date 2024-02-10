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
import NotFound from "@/app/not-found";

const getData = async () => {
    return data;
};

export const generateMetadata = async ({ params }: { params: { categoryId: string } }): Promise<Metadata> => {
    const dataProduct = await getData();
    const dataCategory = dataProduct.filter((el) => el.name === params.categoryId);

    if (dataCategory.length <= 0) return {};

    const title = dataCategory[0].title;
    const description = dataCategory[0].description;
    const name = dataCategory[0].name;

    return {
        title: title,
        description: description,
        openGraph: {
            images: [`/${dataCategory[0].name}/1.jpg`],
        },
    };
};

//страница продукта
export default async function Page({ params }: { params: { categoryId: string } }) {
    const data = await getData();
    const dataCategory = data.filter((el) => el.name === params.categoryId);

    if (dataCategory.length > 0) {
        return (
            <Layout>
                <main className={s.section}>
                    <FormTelegram />

                    {dataCategory.map((el: IData, index: number) => {
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
                                                <Button path={`${el.parentPath}/${el.name}`} className={s.card__cont_button}>
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
    } else {
        return <NotFound />;
    }
}
