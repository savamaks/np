import React from "react";
import s from "./ServicesData.module.scss";
import getBase64 from "@/app/_handlerFunc/getLocalBase64";
import { ICategory, IProduct } from "@/app/types";
import Link from "next/link";
import cn from "classnames";
import Image from "next/image";

const getData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/categories/?populate=*`, {
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

const ServicesData = async () => {
    const data = await getData();

    return (
        <div className={s.container}>
            <Link href={"/services/"}>
                <h1 className={s.container__title}>Услуги</h1>
            </Link>
            <p className={s.container__text}>Мы производим и делаем монтаж любого вида потолка.</p>
            <div className={s.box}>
                {data.data.map(async (el: ICategory, index: number) => {
                    const myBlurDataUrl = await getBase64(`${process.env.NEXT_PUBLIC_SRC_STRAPI}` + `${el.attributes.image.data.attributes.formats.small.url}`);
                    return (
                        <div key={index} className={cn(s.card)}>
                            <Image
                                className={s.card__image}
                                src={`${process.env.NEXT_PUBLIC_SRC_STRAPI}` + `${el.attributes.image.data.attributes.formats.small.url}`}
                                loading="lazy"
                                width={350}
                                height={250}
                                alt="services"
                                placeholder="blur"
                                blurDataURL={myBlurDataUrl}
                            />
                            <div className={s.card__cont}>
                                <Link href={`services/${el.attributes.title}`}>
                                    <h3 className={cn(s.card__cont_title)}>{el.attributes.name}</h3>
                                </Link>

                                {el.attributes.products?.data.map((product: IProduct, indexProduct: number) => {
                                    return (
                                        <Link
                                            key={indexProduct}
                                            className={s.link}
                                            href={`services/${el.attributes.title}/${product.attributes.title}`}
                                        >
                                            <p className={s.card__cont_product}>{product.attributes.name}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServicesData;
