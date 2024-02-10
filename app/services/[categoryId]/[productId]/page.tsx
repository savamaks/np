import React from "react";
import Layout from "../../../components/layout/layout";
import { IData, IProduct, data } from "@/data";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import { Metadata } from "next";
import NotFound from "@/app/not-found";

const getData = async () => {
    return data;
};

export const generateMetadata = async ({ params }: { params: { categoryId: string; productId: string } }): Promise<Metadata> => {
    const dataProduct = await getData();
    const dataCategory = dataProduct.filter((el) => el.name === params.categoryId);
    const product = dataCategory[0].products.filter((el) => el.name === params.productId);

    if (product.length <= 0) return {};

    const title = product[0].title;
    const description = product[0].description;
    const parentPath = product[0].parentPath
    const name = product[0].name

    return {
        title: title,
        description: description,
        openGraph: {
            title: "",
            description: "",
            images: [`/${parentPath}/${name}/1.jpg`],
        },
    };
};

export default async function Page({ params }: { params: { categoryId: string; productId: string } }) {
    const data = await getData();
    const dataCategory = data.filter((el) => el.name === params.categoryId);
    const dataProduct = dataCategory[0].products.filter((el) => el.name === params.productId);

    if (dataProduct.length > 0) {
        return (
            <Layout>
                <main>
                    {dataProduct.map((product: IProduct, index: number) => {
                        return <ProductCard key={index} el={product} categoryId={params.categoryId} categoryName={product.parentName} />;
                    })}
                </main>
            </Layout>
        );
    } else {
        return <NotFound />;
    }
}
