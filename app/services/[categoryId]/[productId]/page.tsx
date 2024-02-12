import React from "react";
import Layout from "../../../components/layout/layout";
import { IProduct, data } from "@/data";
import { Metadata } from "next";
import NotFound from "@/app/not-found";
import Image from "next/image";
import s from "./page.module.scss";
import cn from "classnames";
import Link from "next/link";
import { toBase64, shimmer } from "@/app/_handlerFunc/toBase64";
import FormTelegram from "@/app/components/FormTelegram/FormTelegram";
import SliderCont from "@/app/components/Slider/SliderCont";

//получение данных
const getData = async () => {
    return data;
};

//генерация страниц на сервере по полученым данным
// export const generateStaticParams = async () => {
//     const data = await getData();

//     let arr: Array<IProduct> = [];
//     data.map(({ products }) => {
//         products.map((el) => {
//             arr.push(el);
//         });
//     });

//     return arr.map((el) => ({
//         categoryId: el.parentPath,
//         productId: el.id,
//     }));
// };

//генерация метаданных
export const generateMetadata = async ({ params }: { params: { categoryId: string; productId: string } }): Promise<Metadata> => {
    const dataProduct = await getData();
    const dataCategory = dataProduct.filter((el) => el.id === params.categoryId);
    const product = dataCategory[0].products.filter((el) => el.id === params.productId);

    if (product.length <= 0) return {};

    const title = product[0].title;
    const description = product[0].description;
    const parentPath = product[0].parentPath;
    const id = product[0].id;

    return {
        title: title,
        description: description,
        openGraph: {
            title: "",
            description: "",
            images: [`https://ptz-potolki.ru/${parentPath}/${id}/1.jpg`],
        },
    };
};

//страница продукта
const ProductPage = async ({ params }: { params: { categoryId: string; productId: string } }) => {
    const data = await getData();
    const dataCategory = data.filter((el) => el.id === params.categoryId);
    const dataProduct = dataCategory[0].products.filter((el) => el.id === params.productId);

    if (dataProduct.length > 0) {
        return (
            <Layout>
                <main>
                    {dataProduct.map((product: IProduct, index: number) => {
                        return (
                            <section key={index} className={s.section}>
                                <nav className={s.section__nav}>
                                    <p>
                                        {<Link href="/services">Услуги</Link>}
                                        {" > "}
                                        {<Link href={`/services/${product.parentPath}`}>{product.parentName}</Link>}
                                        {" > "}
                                        {product.title}
                                    </p>
                                </nav>
                                <h1 className={cn(s.section__title)}>{product.title}</h1>
                                <div className={s.section__cont}>
                                    <Image
                                        className={s.section__cont_image}
                                        src={`/${product.parentPath}/${product.id}/${product.images[0]}`}
                                        alt="img"
                                        width={600}
                                        height={450}
                                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(100, 75))}`}
                                    />
                                    <p className={s.section__cont_text}>{product.description}</p>
                                </div>
                                <FormTelegram />

                                <h1 className={cn(s.section__title)}>Галерея</h1>
                                <SliderCont el={product} />
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
