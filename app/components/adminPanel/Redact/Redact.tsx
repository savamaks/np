import { ICategory } from "@/app/types";
import React, { ChangeEvent } from "react";
import s from "./SelectProduct.module.scss";

interface IProps {
    idCategory: string | null;
    setIdCategory: (value: string) => void;
    listCategories: Array<ICategory>;
}

const SelectProduct = ({ idCategory, setIdCategory, listCategories }: IProps) => {
    return (
        <>
            <label htmlFor="select">Выбор Категории</label>
            <select
                name="select"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setIdCategory(e.target.value);
                    console.log(e.target.value);
                }}
                className={s.select}
            >
                {listCategories.map((el: ICategory, index: number) => {
                    return (
                        <option value={el.id} key={index} className={s.select__option} selected={idCategory === el.id ? true : false}>
                            {el.attributes.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default SelectProduct;
