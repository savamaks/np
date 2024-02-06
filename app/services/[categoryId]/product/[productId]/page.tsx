import React, { Suspense } from "react";
import Layout from "../../../../components/layout/layout";
import { IData, IProduct, data } from "@/data";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import Loading from "@/app/loading";
import { Metadata } from "next";

const getData = async () => {
    return data;
};

export const metadata: Metadata = {
    title:'Услуги',
};

export default async function Page({ params }: { params: { categoryId: string; productId: string } }) {
    const data = await getData();

    return (
        <Layout>
            <Suspense fallback={<Loading />}>
                <main>
                    {data.map((category: IData, index: number) => {
                        if (category.name !== params.categoryId) return;
                        return (
                            < >
                                {category.products.map((product: IProduct,index:number) => {
                                    if (product.name !== params.productId) return;
                                    return <ProductCard key={index} el={product} categoryId={params.categoryId} categoryName={category.name} />;
                                })}
                            </>
                        );
                    })}
                </main>
            </Suspense>
        </Layout>
    );
}
