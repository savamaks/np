"use client";

import { ICategory, IProduct } from "@/app/types";
import React, { useEffect, MouseEvent, useState } from "react";
import s from "./page.module.scss";
import { useRouter } from "next/navigation";
import Card from "@/app/components/adminPanel/Card/Card";
import Button from "@/app/components/Button/Button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useStore } from "@/app/components/store/useStore";

interface IPropsData {
    name: string;
    setData: (value: Array<ICategory | IProduct>) => void;
    router: AppRouterInstance;
    token: string;
    authorization: (value: boolean, valueTwo: string) => void;
}

const getData = async ({ setData, name, router, token, authorization }: IPropsData) => {
    try {
        const res = await fetch(`https://wclouds.ru/api/${name}?populate=*`, {
            method: "GET",
            next: {
                revalidate: 0,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        if (res.status === 401) {
            authorization(false, "");
            router.push("/admin");
        }
        setData(data.data);
    } catch (error) {
        console.log(error);
    }
};
const PanelPage = ({ params }: { params: { name: string } }) => {
    const name = params.name;
    const [data, setData] = useState<Array<ICategory | IProduct>>();
    const router = useRouter();
    const nameButton = params.name === "categories" ? "Категорию" : "Продукт";
    const { authService } = useStore();

    const linkRedactPage = (e: MouseEvent<HTMLDivElement>, product: ICategory) => {
        e.preventDefault();
        router.push(`${name}/${product.id}`);
    };
    useEffect(() => {
        getData({ setData, name, router, authorization: authService.authorization, token: authService.token });
        if (!authService.login) {
            router.push("/admin");
        }
    }, []);

    return (
        <div className={s.container}>
            <Button
                className={s.container__button}
                onClick={() => {
                    router.push(`${name}/newcard`);
                }}
            >
                Добавить {nameButton}
            </Button>
            <div className={s.container__box}>
                <h2 className={s.container__box_text}>ID</h2>
                <h2 className={s.container__box_maintext}>Название</h2>
                <h2 className={s.container__box_text}>Ссылка</h2>
                <h2 className={s.container__box_maintext}>Обложка</h2>
            </div>
            {data !== undefined &&
                data &&
                data.map((el: ICategory, index: number) => {
                    return <Card onClick={linkRedactPage} key={index} product={el} />;
                })}
        </div>
    );
};

export default PanelPage;
