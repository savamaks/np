"use client";
import { ICategory, IProduct } from "@/app/types";
import React, { useEffect, MouseEvent, useState } from "react";
import s from "./Products.module.scss";
import CategoryCard from "../CategoryCard/CategoryCard";
import { getData } from "@/app/_handlerFunc/getCategoryAdmin";
import CategoryCardUpdate from "../CategoryCardUpdate/CategoryCardUpdate";
import { json } from "stream/consumers";
import Image from "next/image";
import Modal from "../../Modal/Modal";

const Products = ({ data }: any) => {
    const [redact, setRedact] = useState<string | ICategory>("");
    const [modal, setModal] = useState(true);

    const clickCard = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>, category: string | ICategory) => {
        e.preventDefault();
        setRedact(category);
    };

    return (
        <section className={s.container}>
            <div className={s.box}>
                {data.map((el: IProduct, index: number) => {
                    return (
                        <div className={s.card} key={index}>
                            <Image
                                className={s.card__image}
                                src={`https://wclouds.ru${el.attributes.images.data[0].attributes.url}`}
                                width={200}
                                height={150}
                                alt=""
                            />
                            <p className={s.card__name}>{el.attributes.name}</p>
                        </div>
                    );
                })}
            </div>
            {/* <Modal setModal={setModal} active={modal}>
                <div
                    onClick={(e: MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation();
                    }}
                    className={s.block}
                >
                    dfgdfg
                </div>
            </Modal> */}
            {/* {redact !== "" && (
                <div
                    onClick={(e: MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setRedact("");
                    }}
                    className={s.modal}
                >
                    <div>
                        <CategoryCardUpdate onClick={clickCard} category={redact} />
                    </div>
                </div>
            )} */}
        </section>
    );
};

export default Products;
