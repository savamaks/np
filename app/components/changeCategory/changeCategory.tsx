"use client";

import React, { ChangeEvent, MouseEvent, useState } from "react";
import s from "./changeCategory.module.scss";
import cn from "classnames";
import { downloadfiles, setCategory, setImages } from "@/action/setCategory";

const ChangeCategory = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<FileList | null>(null);

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };
    const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = [...e.target.files];

            let formData = new FormData();
            files.map((el: any) => {
                formData.append("file", el);
            });
            setImages(formData);
    };

    const createCategory = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const result = await setCategory({
            name,
            description,
            image,
        });
        console.log(result);
    };


    const download = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await downloadfiles()
        console.log(result);
    };
    return (
        <section className={cn(s.section)}>
            <h2 className={cn(s.section__title)}>добавить категорию</h2>

            <form className={cn(s.section__form)} action="">
                <div className={cn(s.section__form_box)}>
                    <label className={cn(s.section__form_label)} htmlFor="">
                        Имя
                    </label>
                    <input className={cn(s.section__form_input)} type="text" placeholder="" value={name} onChange={changeName} />
                </div>
                <div className={cn(s.section__form_box)}>
                    <label className={cn(s.section__form_label)} htmlFor="">
                        Описание
                    </label>
                    <input className={cn(s.section__form_input)} type="text" placeholder="" value={description} onChange={changeDescription} />
                </div>
                <div className={cn(s.section__form_box)}>
                    <label className={cn(s.section__form_label)} htmlFor="">
                        Фото
                    </label>
                    <input className={cn(s.section__form_input)} type="file" placeholder="" onChange={changeImage} />
                </div>
                <button onClick={createCategory} className={cn(s.section__form_button)}>
                    Создать
                </button>

                <button onClick={download} className={cn(s.section__form_button)}>
                    Скачать
                </button>
            </form>
        </section>
    );
};
export default ChangeCategory;
