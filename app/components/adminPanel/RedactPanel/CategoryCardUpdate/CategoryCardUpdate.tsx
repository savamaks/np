import { ICategory } from "@/app/types";
import React, { MouseEvent, ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import s from "./CategoryCardUpdate.module.scss";
import cn from "classnames";
import { saveChangeCategory } from "@/app/_handlerFunc/saveChangeCategory";
import Button from "@/app/components/Button/Button";
import { changeImage, deleteImage } from "@/app/_handlerFunc/changeImage";
import auth from "@/app/components/store/auth";
import Modal from "../../Modal/Modal";

interface IProps {
    category: ICategory;
    onClick: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>, category: {}) => void;
}
const CategoryCardUpdate: FC<IProps> = ({ onClick, category }) => {
    const [name, setName] = useState(category.attributes.name);
    const [title, setTitle] = useState(category.attributes.title);
    const [description, setDescription] = useState(category.attributes.description);
    const [activeBtn, setActiveBtn] = useState(false);
    const [preview, setPreview] = useState(`https://wclouds.ru${category.attributes.image.data.attributes.url}`);
    const [files, setFiles] = useState<any>(null);
    const [confirmation, setConfirmation] = useState(false);

    const saveChange = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            name: name,
            title: title,
            description: description,
        };
        const result = await saveChangeCategory({ data, id: category.id });

        const formData = new FormData();

        if (files !== null) {
            formData.append("files", files[0]);
            formData.append("ref", "api::category.category");
            formData.append("refId", category.id);
            formData.append("field", "image");

            const res = await changeImage(auth.token, formData);
            deleteImage(auth.token, category.attributes.image.data.id);
        }
        if (result) {
            onClick(e, {});
            auth.changeReboot();
        }
    };

    const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files !== null) {
            setFiles(e.target.files);
            const file = e.target.files[0];
            const urlImage = URL.createObjectURL(file);
            setPreview(urlImage);
        }
    };
    useEffect(() => {
        if (
            name !== category.attributes.name ||
            title !== category.attributes.title ||
            description !== category.attributes.description ||
            preview !== `https://wclouds.ru${category.attributes.image.data.attributes.url}`
        ) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);
        }
    }, [name, title, description, preview]);

    return (
        <>
            <div
                className={s.card}
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                }}
            >
                <p className={s.card__text}>ID: {category.id}</p>

                <label htmlFor="name">Название</label>
                <input
                    name="name"
                    className={s.card__input}
                    type="text"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setName(e.target.value);
                    }}
                />
                <label htmlFor="title">Ссылка (менять только при необходимости)</label>

                <input
                    name="title"
                    className={s.card__input}
                    type="text"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setTitle(e.target.value);
                    }}
                />
                <label htmlFor="description">Описание</label>

                <textarea
                    name="description"
                    className={s.card__textarea}
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setDescription(e.target.value);
                    }}
                />

                <div>
                    <label className={s.card__textarea} htmlFor="input__file">
                        <Image className={s.card__image} width={500} height={375} src={preview} alt="" />
                    </label>
                    <input className={s.card__inputimage} type="file" onChange={uploadFile} id="input__file" />
                </div>
                <div className={s.card__box}>
                    <Button
                        onClick={() => {
                            setConfirmation(true);
                        }}
                        disabled={!activeBtn}
                        className={s.savebtn}
                    >
                        Сохранить
                    </Button>
                    <Button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            onClick(e, {});
                        }}
                        className={s.savebtn}
                    >
                        Выйти
                    </Button>
                </div>
            </div>
            <Modal
                active={confirmation}
                onClick={() => {
                    setConfirmation(false);
                }}
            >
                <div className={s.confirmation}>
                    <p>Вы точно хотите сохранить изменения?</p>
                    <div className={s.confirmation__box}>
                        <Button onClick={saveChange}>ok</Button>
                        <Button
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();

                                setConfirmation(false);
                            }}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CategoryCardUpdate;
