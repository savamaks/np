import { IProduct } from "@/app/types";
import React, { MouseEvent, ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import s from "./ProductCard.module.scss";

interface IProps {
    product: IProduct;
    onClick: (e: MouseEvent<HTMLDivElement>, product: IProduct) => void;
}
const ProductCard: FC<IProps> = ({ product, onClick }) => {
    return (
        <>
            <div
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    onClick(e, product);
                }}
                className={s.card}
            >
                <p className={s.card__text}>{product.id}</p>
                <p className={s.card__maintext}>{product.attributes.name}</p>
                <p className={s.card__text}>{product.attributes.title}</p>
                <Image
                    className={s.card__image}
                    src={`https://wclouds.ru${product.attributes.images.data[0].attributes.url}`}
                    alt={`image ${product.attributes.name}`}
                    width={200}
                    height={150}
                />
            </div>
        </>
    );
};

export default ProductCard;
