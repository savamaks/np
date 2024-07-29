"use client";
import CategoryCard from "@/app/components/adminPanel/RedactPanel/CategoryCard/CategoryCard";
import Products from "@/app/components/adminPanel/RedactPanel/Products/Products";
import auth from "@/app/components/store/auth";
import { ICategory, IProduct } from "@/app/types";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/adminPanel/RedactPanel/ProductCard.tsx/ProductCard";

const getData = async (setData: any, name: string) => {
    try {
        const res = await fetch(`https://wclouds.ru/api/${name}?populate=*`, {
            method: "GET",
            next: {
                revalidate: 0,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
        });
        const data = await res.json();
        if (!res.ok) {
            auth.authorization(false, "");
        }
        setData(data);
    } catch (error) {
        console.log(error);
    }
};
const PanelPage = ({ params }: { params: { name: string } }) => {
    const name = params.name;
    const [data, setData] = useState<any>({});
    const router = useRouter();

    useEffect(() => {
        getData(setData, name);
        if (!auth.login) {
            router.push("/admin");
        }
    }, []);

    return (
        <div className={s.container}>
            <div className={s.container__box}>
                <h2 className={s.container__box_text}>ID</h2> 
                <h2 className={s.container__box_maintext}>Название</h2>
                <h2 className={s.container__box_text}>Ссылка</h2>
                <h2 className={s.container__box_maintext}>Обложка</h2>
            </div>
            {data.data &&
                data.data.map((el: ICategory | IProduct, index: number) => {
                    if (name === "categories") {
                        return <CategoryCard category={el} />;
                    } else if (name === "products") {
                        return <ProductCard product={el} />;
                    }
                })}
        </div>
    );
};

export default PanelPage;
