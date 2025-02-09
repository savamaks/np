import React from "react";
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
import ArrowUp from "@/app/components/arrowUp/ArrowUp";
import Video from "@/app/components/Video/Video";

//получение данных
const getData = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/categories?populate[products][populate][0]=image&populate[products][populate][1]=images`,
            {
                method: "GET",
                next: {
                    revalidate: 300,
                },
                headers: {
                    "Content-Type": "application/json",

                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
                },
            }
        );
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

//генерация метаданных
export const generateMetadata = async ({ params }: { params: { categoryId: string; productId: string } }): Promise<Metadata> => {
    const data: Array<ICategory> = await getData();
    const category: Array<ICategory> = data.filter((el: ICategory) => el.attributes.title === params.categoryId);
    if (category === undefined) return {};
    if (category[0].attributes.products === undefined) return {};
    const product: Array<IProduct> = category[0].attributes.products.data.filter((el: IProduct) => el.attributes.title === params.productId);

    if (product.length <= 0) return {};

    const title = product[0].attributes.name;
    const description = product[0].attributes.description;
    const srcImage = `${process.env.NEXT_PUBLIC_SRC_STRAPI}` + product[0].attributes.image.data.attributes.url;
    return {
        title: title,
        description: description,
        openGraph: {
            title: "",
            description: "",
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

//генерация страниц на сервере по полученым данным
export const generateStaticParams = async ({ params }: { params: { categoryId: string; productId: string } }) => {
    const categoryData = await getData();
    const data: Array<ICategory> = categoryData;

    return data.map((category) => {
        if (category.attributes.products === undefined) {
            return {};
        } else {
            category.attributes.products.data.map((product) => {
                return { categoryId: category.attributes.title, productId: product.attributes.title };
            });
        }
    });
};

//страница продукта
const ProductPage = async ({ params }: { params: { categoryId: string; productId: string } }) => {
    const data = await getData();
    const category: Array<ICategory> = data.filter((el: IProduct) => el.attributes.title === params.categoryId);
    if (category[0].attributes.products === undefined) return {};

    const product: Array<IProduct> = category[0].attributes.products.data.filter((el: IProduct) => el.attributes.title === params.productId);

    if (product.length > 0) {
        return (
            <>
                <main>
                    {product.map(async (product: IProduct, index: number) => {
                        let myBlurDataUrl;
                        if (product.attributes.image.data.attributes.formats.small !== undefined) {
                            myBlurDataUrl = await getBase64(`${process.env.NEXT_PUBLIC_SRC_STRAPI}${product.attributes.image.data.attributes.formats.small.url}`);
                        }

                        return (
                            <section key={index} className={s.section}>
                                <ArrowUp />
                                <nav className={s.section__nav}>
                                    <p>
                                        {<Link href="/services">Услуги</Link>}
                                        {" > "}
                                        {<Link href={`/services/${params.categoryId}`}>{category[0].attributes.name}</Link>}
                                        {" > "}
                                        {product.attributes.name}
                                    </p>
                                </nav>
                                <h2 className={cn(s.section__title)}>{product.attributes.name}</h2>
                                <div className={s.section__cont}>
                                    <Image
                                        className={s.section__cont_image}
                                        src={`${process.env.NEXT_PUBLIC_SRC_STRAPI}${product.attributes.image.data.attributes.url}`}
                                        alt="img"
                                        width={600}
                                        height={450}
                                        placeholder="blur"
                                        blurDataURL={myBlurDataUrl}
                                    />
                                    <p className={s.section__cont_text}>{product.attributes.description}</p>
                                </div>
                                <FormTelegram>Заявка на замер</FormTelegram>

                                {product.attributes.video && (
                                    <>
                                        <h2 className={cn(s.section__title)}>Видео</h2>
                                        <Video title={product.attributes.name} src={product.attributes.video} />
                                    </>
                                )}
                                <h2 className={cn(s.section__title)}>Галерея</h2>
                                <FullImage images={product.attributes.images} />
                                {/* <SliderCont el={product.attributes.images.data} /> */}
                            </section>
                        );
                    })}
                </main>
            </>
        );
    } else {
        return <NotFound />;
    }
};
export default ProductPage;
