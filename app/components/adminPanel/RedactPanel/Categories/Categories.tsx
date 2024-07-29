"use client";
import { ICategory } from "@/app/types";
import React, { useEffect, MouseEvent, useState } from "react";
import s from "./Categories.module.scss";
import CategoryCard from "../CategoryCard/CategoryCard";
import { getData } from "@/app/_handlerFunc/getCategoryAdmin";
import CategoryCardUpdate from "../CategoryCardUpdate/CategoryCardUpdate";
import Modal from "../../Modal/Modal";
import auth from "@/app/components/store/auth";
import Button from "@/app/components/Button/Button";
import Create from "../create/Create";

const Categories = ({ data }: any) => {
    const [redact, setRedact] = useState<{} | ICategory>({});
    const [modal, setModal] = useState(true);

    const clickCard = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>, category: string | ICategory) => {
        e.preventDefault();
        setRedact(category);
        auth.changePosition(true);
    };
    return (
        <section className={s.container}>
            <h2>Категории</h2>
            <Button
                className={s.button}
                onClick={() => {
                    setModal((prev) => !prev);
                }}
            >
                Добавить Категорию
            </Button>
            <div className={s.box}>
                {data.map((el: ICategory, index: number) => {
                    return <CategoryCard onClick={clickCard} key={index} category={el} />;
                })}
            </div>

            <Modal
                onClick={() => {
                    setRedact({});
                    auth.changePosition(false);
                }}
                active={redact.attributes ? true : false}
            >
                {redact.attributes && (
                    <>
                        <CategoryCardUpdate onClick={clickCard} category={redact} />
                    </>
                )}
            </Modal>

            <Modal
                onClick={() => {
                    setModal((prev) => !prev);
                }}
                active={modal}
            >
                <Create upModal={setModal} />
            </Modal>
        </section>
    );
};

export default Categories;
