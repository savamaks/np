"use client";
import React, { useEffect, useState } from "react";
import auth from "@/app/components/store/auth";
import Categories from "./Categories/Categories";
import { ICategory } from "@/app/types";
import Products from "./Products/Products";
import s from "./RedactPanel.module.scss";
import { observer } from "mobx-react-lite";

const getDataCategories = async (setDataCategories: any) => {
    try {
        const res = await fetch(`https://wclouds.ru/api/categories?populate=*`, {
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
        if (res.status === 401) {
            auth.authorization(false, "");
        }
        setDataCategories(data);
    } catch (error) {
        console.log(error);
    }
};
const getDataProducts = async (setDataProducts: any) => {
    try {
        const res = await fetch(`https://wclouds.ru/api/products?populate=*`, {
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
        if (res.status === 401) {
            auth.authorization(false, "");
        }
        setDataProducts(data);
    } catch (error) {
        console.log(error);
    }
};
const RedactPanel = observer(() => {
    const [name, setName] = useState(0);
    const [dataCategories, setDataCategories] = useState<{} | { data: Array<ICategory> }>({});
    const [dataProducts, setDataProducts] = useState<{} | { data: {} }>({});

    useEffect(() => {
        getDataCategories(setDataCategories);
        getDataProducts(setDataProducts);
    }, [auth.reboot]);

    return (
        <div className={s.container}>
            {dataCategories.data && <Categories data={dataCategories.data} />}
            {dataProducts.data && <Products data={dataProducts.data} />}
        </div>
    );
});

export default RedactPanel;
