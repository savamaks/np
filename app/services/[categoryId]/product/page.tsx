import React from "react";
import Layout from "../../../components/layout/layout";
import s from "./page.module.scss";
import { IData, data } from "@/data";
import ProductCard from "@/app/components/ProductCard/ProductCard";

const getData = async () => {
    return data;
};
export default async function Page({ params }: { params: { categoryId: string } }) {
    const data = await getData();
    return (
        <Layout>
            <main className={s.section}>
                {data.map((el: IData, index: number) => {
                    if (el.name !== params.categoryId) return;
                    return <ProductCard el={el} key={index} />;
                })}
            </main>
        </Layout>
    );
}
