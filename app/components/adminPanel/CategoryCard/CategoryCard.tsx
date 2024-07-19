import { ICategory } from "@/app/types";
import React, { MouseEvent, ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import s from "./CategoryCard.module.scss";
import cn from "classnames";
import { saveChangeCategory } from "@/app/_handlerFunc/saveChangeCategory";

interface IProps {
    category: ICategory;
}
const CategoryCard: FC<IProps> = ({ category }) => {
    const [name, setName] = useState(category.attributes.name);
    const [title, setTitle] = useState(category.attributes.title);
    const [description, setDescription] = useState(category.attributes.description);
    const [activeBtn, setActiveBtn] = useState(false);

    const changeCategory = (e: MouseEvent<HTMLButtonElement>) => {
        const data = {
            name: name,
            title: title,
            description: description,
        };
        saveChangeCategory({ data, id: category.id });
    };

    useEffect(() => {
        if (name !== category.attributes.name || title !== category.attributes.title || description !== category.attributes.description) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);
        }
    }, [name, title, description]);
    

    return (
        <div>
            <div className={s.card}>
                <div className={s.card__box}>
                    <label className={s.card__box_label} htmlFor="name">
                        ID
                    </label>
                    <p className={s.card__text}>{category.id}</p>
                </div>
                <div className={s.card__box}>
                    <label className={s.card__box_label} htmlFor="name">
                        Название
                    </label>
                    <input
                        className={s.card__box_input}
                        type="text"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className={s.card__box}>
                    <label className={s.card__box_label} htmlFor="name">
                        Ссылка
                    </label>
                    <input
                        className={s.card__box_input}
                        type="text"
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <div className={s.card__box}>
                    <label className={s.card__box_label} htmlFor="name">
                        Описание
                    </label>
                    <textarea
                        className={s.card__box_textarea}
                        value={description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setDescription(e.target.value);
                        }}
                    />
                </div>
                {/* <div>
             <h3>зависимости</h3>
             <div>
                 {category.attributes.products.data.map((product: IProduct) => {
                     return <p>{product.attributes.name}</p>;
                 })}
             </div>
         </div> */}
                <Image
                    src={`https://wclouds.ru${category.attributes.image.data.attributes.url}`}
                    alt={`image ${category.attributes.name}`}
                    width={200}
                    height={150}
                />
            </div>
            <button onClick={changeCategory} disabled={!activeBtn} className={s.savebtn}>
                Save
            </button>
        </div>
    );
};

export default CategoryCard;
