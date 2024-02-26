import React from "react";
import Layout from "../../../components/layout/layout";
import { Metadata } from "next";
import NotFound from "@/app/not-found";
import Image from "next/image";
import s from "./page.module.scss";
import cn from "classnames";
import Link from "next/link";
import FormTelegram from "@/app/components/FormTelegram/FormTelegram";
import SliderCont from "@/app/components/Slider/SliderCont";
import { ICategory, IProduct } from "@/app/types";
import getBase64 from "@/app/_handlerFunc/getLocalBase64";
import FullImage from "@/app/components/FullImages/FullImage";

//получение данных
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

//генерация метаданных
export const generateMetadata = async ({ params }: { params: { categoryId: string; productId: string } }): Promise<Metadata> => {
    const data = await getData();
    const category: Array<ICategory> = data.data.filter((el: IProduct) => el.attributes.title === params.categoryId);
    const product: Array<IProduct> = category[0].attributes.products.data.filter((el: IProduct) => el.attributes.title === params.productId);

    if (product.length <= 0) return {};

    const title = product[0].attributes.name;
    const description = product[0].attributes.description;
    const srcImage = "https://wclouds.ru" + product[0].attributes.images.data[0].attributes.url;
    return {
        title: title,
        description: description,
        openGraph: {
            title: "",
            description: "",
            images: [srcImage],
            
        },
        twitter: {
            card: "summary_large_image",
        }
    };
};

//генерация страниц на сервере по полученым данным
export const generateStaticParams = async ({ params }: { params: { categoryId: string; productId: string } }) => {
    const categoryData = await getData();
    const data: Array<ICategory> = categoryData.data;

    return data.map((category) =>
        category.attributes.products.data.map((product) => {
            return { categoryId: category.attributes.title, productId: product.attributes.title };
        })
    );
};

//страница продукта
const ProductPage = async ({ params }: { params: { categoryId: string; productId: string } }) => {
    const data = await getData();
    const category: Array<ICategory> = data.data.filter((el: IProduct) => el.attributes.title === params.categoryId);
    const product: Array<IProduct> = category[0].attributes.products.data.filter((el: IProduct) => el.attributes.title === params.productId);

    if (product.length > 0) {
        return (
            <Layout>
                <main>
                    {product.map(async (product: IProduct, index: number) => {
                        const myBlurDataUrl = await getBase64(`https://wclouds.ru${product.attributes.images.data[0].attributes.formats.small.url}`);

                        return (
                            <section key={index} className={s.section}>
                                <nav className={s.section__nav}>
                                    <p>
                                        {<Link href="/services">Услуги</Link>}
                                        {" > "}
                                        {<Link href={`/services/${params.categoryId}`}>{category[0].attributes.name}</Link>}
                                        {" > "}
                                        {product.attributes.name}
                                    </p>
                                </nav>
                                <h1 className={cn(s.section__title)}>{product.attributes.name}</h1>
                                <div className={s.section__cont}>
                                    <Image
                                        className={s.section__cont_image}
                                        src={`https://wclouds.ru${product.attributes.images.data[0].attributes.url}`}
                                        alt="img"
                                        width={600}
                                        height={450}
                                        placeholder="blur"
                                        blurDataURL={myBlurDataUrl}
                                    />
                                    <p className={s.section__cont_text}>{product.attributes.description}</p>
                                </div>
                                <FormTelegram />

                                <h1 className={cn(s.section__title)}>Галерея</h1>
                                <FullImage images={product.attributes.images} />

                                {/* <SliderCont el={product.attributes.images.data} /> */}
                            </section>
                        );
                    })}
                </main>
            </Layout>
        );
    } else {
        return <NotFound />;
    }
};
export default ProductPage;
