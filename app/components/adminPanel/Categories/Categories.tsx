"use client";
import { ICategory } from "@/app/types";
import React, { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import s from "./Categories.module.scss";

const Categories = () => {
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const res = await fetch(`https://wclouds.ru/api/categories?populate=*`, {
                method: "GET",
                next: {
                    revalidate: 0,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
                },
            });
            const data = await res.json();
            setData(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section className={s.container}>
            {data.map((el: ICategory, index: number) => {
                return <CategoryCard key={index} category={el} />;
            })}
        </section>
    );
};

export default Categories;
