import { ICategory } from "@/app/types";
import React, { MouseEvent, ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import s from "./CategoryCard.module.scss";

interface IProps {
    category: ICategory;
    onClick: (e: MouseEvent<HTMLDivElement>, category: ICategory) => void;
}
const CategoryCard: FC<IProps> = ({ category, onClick }) => {
    return (
        <>
            <div
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    onClick(e, category);
                }}
                className={s.card}
            >
                <p className={s.card__text}>{category.id}</p>
                <p className={s.card__text}>{category.attributes.name}</p>
                <p className={s.card__text}>{category.attributes.title}</p>
                <Image
                    className={s.card__image}
                    src={`https://wclouds.ru${category.attributes.image.data.attributes.url}`}
                    alt={`image ${category.attributes.name}`}
                    width={200}
                    height={150}
                />
            </div>
        </>
    );
};

export default CategoryCard;
