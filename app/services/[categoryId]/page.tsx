import React from "react";
import s from "./page.module.scss";
import Image from "next/image";
import cn from "classnames";
import Link from "next/link";
import getBase64 from "@/app/_handlerFunc/getLocalBase64";
import { Metadata } from "next";
import FormTelegram from "@/app/components/FormTelegram/FormTelegram";
import NotFound from "@/app/not-found";
import { ICategory, IProduct } from "@/app/types";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

const getData = async () => {
    try {
        const response = await fetch(`https://wclouds.ru/api/categories?populate[products][populate][0]=images`, {
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
const getCategoryMeta = async () => {
    try {
        const response = await fetch(`https://wclouds.ru/api/categories?populate=*`, {
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
//генерация страниц на сервере по полученым данным
export const generateStaticParams = async () => {
    const categoryData = await getData();
    const data: Array<ICategory> = categoryData.data;

    return data.map(({ attributes }) => attributes.title);
};

//генерация метаданных
export const generateMetadata = async ({ params }: { params: { categoryId: string } }): Promise<Metadata> => {
    const categoryData = await getCategoryMeta();

    const data: Array<ICategory> = categoryData.data.filter((el: ICategory) => el.attributes.title === params.categoryId);

    if (data.length <= 0) return {};

    const title = data[0].attributes.name;
    const description = data[0].attributes.description;
    const srcImage = "https://wclouds.ru" + data[0].attributes.image.data.attributes.formats.small.url;

    return {
        title: title,
        description: description,
        authors: [{ name: "Maksim Savinec" }],
        openGraph: {
            images: [
                {
                    url: srcImage,
                    width: 800,
                    height: 600,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
        },
    };
};

//страница списка продукции из категории
const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
    const categoryData = await getData();
    const data: Array<ICategory> = categoryData.data.filter((el: ICategory) => el.attributes.title === params.categoryId);
    if (data.length !== 0) {
        return (
            <>
                <main className={s.section}>
                    <FormTelegram />
                    <nav className={s.section__nav}>
                        <p>
                            {<Link href="/services">Услуги</Link>}
                            {" > "}
                            {data[0].attributes.name}
                        </p>
                    </nav>
                    <h1 className={cn(s.section__title)}>{data[0].attributes.name}</h1>
                    {data[0].attributes.products.data.map(async (el: IProduct, index: number) => {
                        let srcImage = "";

                        if (el.attributes.images.data !== null) {
                            srcImage += "https://wclouds.ru" + el.attributes.images.data[0].attributes.formats.small.url;
                        } else {
                            srcImage += "https://wclouds.ru" + "/uploads/assets_0f9f13cb55.png";
                        }

                        const myBlurDataUrl = await getBase64(srcImage);

                        return (
                            <>
                                <div key={index} className={s.card}>
                                    <Image
                                        className={s.card__image}
                                        src={`${srcImage}`}
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

                                        <ButtonLink path={`${data[0].attributes.title}/${el.attributes.title}`} className={s.card__cont_button}>
                                            Подробнее
                                        </ButtonLink>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </main>
            </>
        );
    } else {
        return <NotFound />;
    }
};
export default CategoryPage;
