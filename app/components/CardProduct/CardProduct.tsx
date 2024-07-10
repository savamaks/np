import React, { FC } from "react";
import s from "./CardProduct.module.scss";
import Link from "next/link";
import Button from "../Button/Button";
import Image from "next/image";
import cn from "classnames";

interface IProps {
    href: string;
    src: string;
    blur: string | undefined;
    name: string;
    description: string;
}
const CardProduct: FC<IProps> = ({ href, src, blur, name, description }) => {
    return (
        <div>
            <Link className={s.link} href={href}>
                <div className={cn(s.card)}>
                    <Image
                        className={s.card__image}
                        src={src}
                        loading="lazy"
                        width={400}
                        height={300}
                        alt={name}
                        placeholder="blur"
                        blurDataURL={blur}
                    />
                    <div className={s.card__cont}>
                        <h3 className={cn(s.card__cont_title)}>{name}</h3>
                        <p className={s.card__cont_text}>{description}</p>
                        <Button>Подробнее</Button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardProduct;
