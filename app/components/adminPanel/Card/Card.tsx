import { ICategory } from "@/app/types";
import React, { MouseEvent, ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import s from "./Card.module.scss";

interface IProps {
    product: ICategory;
    onClick?: (e: MouseEvent<HTMLDivElement>, product: ICategory) => void;
}
const Card: FC<IProps> = ({ product, onClick }) => {
    const srcImage = product.attributes.image.data
        ? `https://wclouds.ru${product.attributes.image.data.attributes.url}`
        : "https://wclouds.ru/uploads/free_icon_image_editing_8304794_ce7538248f.png";
    return (
        <>
            <div
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    if (onClick) {
                        onClick(e, product);
                    }
                }}
                className={s.card}
            >
                <p className={s.card__text}>{product.id}</p>
                <p className={s.card__maintext}>{product.attributes.name}</p>
                <p className={s.card__text}>{product.attributes.title}</p>
                <Image className={s.card__image} src={srcImage} alt={`image ${product.attributes.name}`} width={200} height={150} />
            </div>
        </>
    );
};

export default Card;
