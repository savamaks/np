import React from "react";
import s from "./page.module.scss";
import cn from "classnames";
import Link from "next/link";
import getBase64 from "@/app/_handlerFunc/getLocalBase64";
import { Metadata } from "next";
import FormTelegram from "@/app/components/FormTelegram/FormTelegram";
import NotFound from "@/app/not-found";
import { ICategory, IProduct } from "@/app/types";
import Button from "@/app/components/Button/Button";
import ArrowUp from "@/app/components/arrowUp/ArrowUp";
import CardProduct from "@/app/components/CardProduct/CardProduct";

const getData = async () => {
    try {
        const response = await fetch(`https://wclouds.ru/api/categories?populate[products][populate][0]=image&populate[products][populate][1]=images`, {
            method: "GET",
            next: {
                revalidate: 300,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
            },
        });
        const data = await response.json();
        return data.data;
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
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
};
//генерация страниц на сервере по полученым данным
export const generateStaticParams = async () => {
    const categoryData: Array<ICategory> = await getData();

    return categoryData.map(({ attributes }) => attributes.title);
};

//генерация метаданных
export const generateMetadata = async ({ params }: { params: { categoryId: string } }): Promise<Metadata> => {
    const categoryData = await getCategoryMeta();

    const data: Array<ICategory> = categoryData.filter((el: ICategory) => el.attributes.title === params.categoryId);

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
    const data: Array<ICategory> = categoryData.filter((el: ICategory) => el.attributes.title === params.categoryId);
    if (data.length !== 0) {
        return (
            <>
                <main className={s.section}>
                    <FormTelegram>Заявка на замер</FormTelegram>
                    <ArrowUp />

                    <nav className={s.section__nav}>
                        <p>
                            {<Link href="/services">Услуги</Link>}
                            {" > "}
                            {data[0].attributes.name}
                        </p>
                    </nav>
                    <h1 className={cn(s.section__title)}>{data[0].attributes.name}</h1>
                    <div className={s.section__box}>
                        {data[0].attributes.products.data.map(async (el: IProduct, index: number) => {
                            let srcImage = "";

                            if (el.attributes.images.data !== null) {
                                srcImage += "https://wclouds.ru" + el.attributes.image.data.attributes.formats.small?.url;
                            } else {
                                srcImage += "https://wclouds.ru" + "/uploads/assets_0f9f13cb55.png";
                            }

                                const myBlurDataUrl = await getBase64(srcImage);
                                return (
                                    <CardProduct
                                        key={index}
                                        href={`${data[0].attributes.title}/${el.attributes.title}`}
                                        src={`${srcImage}`}
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
    } else {
        return <NotFound />;
    }
};
export default CategoryPage;
