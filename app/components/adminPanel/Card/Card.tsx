"use client";
import { ICategory } from "@/app/types";
import React, { MouseEvent,  FC } from "react";
import Image from "next/image";
import s from "./Card.module.scss";
import cn from "classnames";

interface IProps {
    product: ICategory;
    onClick?: (e: MouseEvent<HTMLDivElement>, product: ICategory) => void;
}
const Card: FC<IProps> = ({ product, onClick }) => {
    const srcImage = product.image
        ? `${process.env.NEXT_PUBLIC_SRC_STRAPI}${product.image.url}`
        : `${process.env.NEXT_PUBLIC_SRC_STRAPI}/uploads/free_icon_image_editing_8304794_ce7538248f.png`;
    return (
        <>
            <div
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                    if (onClick) {
                        onClick(e, product);
                    }
                }}
                className={s.card}
            >
                <p className={s.card__text}>{product.id}</p>
                <div className={s.card__box}>
                    <p className={s.card__maintext}>{product.name}</p>
                    <p className={cn(s.card__public, product.publishedAt === null ? s.card__draft : s.card__published)}>
                        {product.publishedAt === null ? "Неопубликован" : "Опубликован"}
                    </p>
                </div>
                <p className={s.card__text}>{product.title}</p>
                <Image className={s.card__image} src={srcImage} alt={`image ${product.name}`} width={200} height={150} />
            </div>
        </>
    );
};

export default Card;
