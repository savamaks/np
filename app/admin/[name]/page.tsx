"use client";

import { ICategory, IProduct, IRequest } from "@/app/types";
import React, { useEffect, MouseEvent, useState } from "react";
import s from "./page.module.scss";
import { useRouter } from "next/navigation";
import Card from "@/app/components/adminPanel/Card/Card";
import Button from "@/app/components/Button/Button";
import { useStore } from "@/app/components/store/useStore";
import Request from "@/app/components/adminPanel/Request/Request";
import Loading from "@/app/loading";

interface IPropsData {
    name: string;
    token: string;
}

const getData = async ({ name, token }: IPropsData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/${name}?populate=*&publicationState=preview`, {
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
            return null;
        }
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const PanelPage = ({ params }: { params: { name: string } }) => {
    const name = params.name;
    const [data, setData] = useState<Array<ICategory | IProduct>>();
    const [dataRequest, setDataRequest] = useState<Array<IRequest>>();

    const router = useRouter();
    const nameButton = params.name === "categories" ? "Категорию" : "Продукт";
    const { authService } = useStore();

    const linkRedactPage = (e: MouseEvent<HTMLDivElement>, product: ICategory) => {
        e.preventDefault();
        router.push(`${name}/${product.id}`);
    };
    const api = async () => {
        const res = await getData({ name, token: authService.token });

        if (res === null) {
            authService.authorization(false, "");
            router.push("/admin");
        } else {
            if (name === "requests") {
                setDataRequest(res);
            } else {
                setData(res);
            }
        }
    };
    useEffect(() => {
        api();
    }, []);

    return (
        <div className={s.container}>
            {(name === "products" || name === "categories") && (
                <>
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
                    {data ? (
                        data.map((el: ICategory, index: number) => {
                            return <Card onClick={linkRedactPage} key={index} product={el} />;
                        })
                    ) : (
                        <Loading />
                    )}
                </>
            )}
            {name === "requests" && dataRequest !== undefined && (
                <>
                    <Button
                        className={s.container__button}
                        onClick={() => {
                            router.push(`${name}/createrequest`);
                        }}
                    >
                        Добавить Вопрос
                    </Button>
                    {dataRequest ? <Request data={dataRequest} /> : <Loading />}
                </>
            )}
        </div>
    );
};

export default PanelPage;
