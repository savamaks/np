import { ICategory } from "@/app/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./SelectProduct.module.scss";
import { useStore } from "../../store/useStore";

interface IProps {
    idCategory: string | null;
    setIdCategory: (value: string | null) => void;
}
interface IPropsData {
    token: string;
}

const getData = async ({ token }: IPropsData): Promise<Array<ICategory> | null> => {
    try {
        const res = await fetch(`https://wclouds.ru/api/categories?&publicationState=preview`, {
            method: "GET",
            next: {
                revalidate: 0,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 401) {
            return null;
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const SelectProduct = ({ idCategory, setIdCategory }: IProps) => {
    const [data, setData] = useState<Array<ICategory>>();

    const { authService } = useStore();
    const api = async () => {
        const res = await getData({ token: authService.token });
        if (res !== null) {
            setData(res);
        } else {
        }
    };
    useEffect(() => {
        api();
    }, []);
    return (
        <>
            <label htmlFor="select">Выбор Категории</label>
            <select
                name="select"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    if (e.target.value !== "none") {
                        setIdCategory(e.target.value);
                    } else {
                        setIdCategory(null);
                    }
                }}
                className={s.select}
            >
                {data !== undefined &&
                    data.map((el: ICategory, index: number) => {
                        return (
                            <option value={el.id} key={index} className={s.select__option} selected={idCategory === el.id ? true : false}>
                                {el.attributes.name}
                            </option>
                        );
                    })}
                <option value="none" selected={idCategory === null ? true : false}>
                    Нет категории
                </option>
            </select>
        </>
    );
};

export default SelectProduct;
