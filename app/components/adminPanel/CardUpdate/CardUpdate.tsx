"use client";

import { ICategory, IDataImage, INewData, IProduct } from "@/app/types";
import React, { MouseEvent, FC, useEffect, useState } from "react";
import s from "./CardUpdate.module.scss";

import { useRouter } from "next/navigation";
import Input from "../Input/Input";
import SelectProduct from "../SelectProduct/SelectProduct";
import ListProduct from "../ListProduct/ListProduct";
import AddImages from "../AddImages/AddImages";
import GalleryImage from "../GalleryImage/GalleryImage";
import { useStore } from "../../store/useStore";
import cn from "classnames";
import { changeImage } from "@/app/_handlerFunc/admin/changeImage";
import { deleteImage } from "@/app/_handlerFunc/admin/deleteImage";
import { saveChangeCategory } from "@/app/_handlerFunc/admin/saveChangeCategory";
import CardButtons from "../CardButtons/CardButtons";
import Confirmation from "../Confirmation/Confirmation";
import { deleteEntry } from "@/app/_handlerFunc/admin/deleteEntry";

interface IProps {
    link: string;
    refresh: () => void;
    setConfirmation: (value: boolean) => void;
    confirmation: boolean;
    data: ICategory | IProduct;
}
const CardUpdate: FC<IProps> = ({ refresh, setConfirmation, confirmation, data, link }) => {
    console.log(data);
    const [name, setName] = useState(data.attributes.name);
    const [title, setTitle] = useState(data.attributes.title);
    const [description, setDescription] = useState(data.attributes.description);
    const [video, setVideo] = useState(data.attributes.video);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(
        data.attributes.image.data
            ? `https://wclouds.ru${data.attributes.image.data.attributes.url}`
            : "https://wclouds.ru/uploads/free_icon_image_editing_8304794_ce7538248f.png"
    );

    const [files, setFiles] = useState<FileList | null>(null);
    const [file, setFile] = useState<FileList | null>(null);
    const [idCategory, setIdCategory] = useState<string | null>(
        data.attributes.category !== undefined ? (data.attributes.category?.data !== null ? data.attributes.category?.data.id : null) : null
    );
    const [listIdConnect, setListIdConnect] = useState<Array<string>>([]);
    const [listIdDisconnect, setListIdDisconnect] = useState<Array<string>>([]);
    const [confirmationDel, setConfirmationDel] = useState(false);

    const { authService, appService } = useStore();

    const router = useRouter();

    useEffect(() => {
        if (!authService.login) {
            router.push("/admin");
        }
    }, [authService.login]);

    const changePublished = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const time = new Date().toLocaleDateString().split(".").reverse().join("-");

        const newData: INewData = {
            publishedAt: data.attributes.publishedAt !== null ? null : time,
        };
        const result = await saveChangeCategory({ data: newData, id: data.id, link, token: authService.token });
        if (result === null) {
            authService.authorization(false, "");
            router.push("/admin");
        } else if (result) {
            refresh();
        }
    };
    const saveChange = async (e: MouseEvent<HTMLButtonElement>) => {
        setLoading(true);

        e.preventDefault();
        const newData: INewData = {
            name: name,
            title: title,
            description: description,
            video: video,
        };
        if (idCategory !== null) {
            newData.category = {
                connect: [
                    {
                        id: idCategory,
                        position: {
                            start: true,
                        },
                    },
                ],
            };
        } else if (idCategory === null && data.attributes.category?.data !== null) {
            if (data.attributes.category?.data.id !== undefined) {
                newData.category = {
                    disconnect: [
                        {
                            id: data.attributes.category.data.id,
                        },
                    ],
                };
            }
        }
        if (link === "categories") {
            newData.products = {
                connect: listIdConnect,
                disconnect: listIdDisconnect,
            };
        }
        const result = await saveChangeCategory({ data: newData, id: data.id, link, token: authService.token });
        if (result === null) {
            authService.authorization(false, "");
            router.push("/admin");
        }
        //сохранение изображения

        if (file !== null) {
            const formData = new FormData();

            const linkApi = link === "categories" ? "category" : "product";

            formData.append("files", file[0]);
            formData.append("ref", `api::${linkApi}.${linkApi}`);
            formData.append("refId", data ? data?.id : "");
            formData.append("field", "image");

            await changeImage({ token: authService.token, formData });

            if (data.attributes.image?.data !== null && data.attributes.image !== undefined) {
                const res = await deleteImage({
                    token: authService.token,
                    id: data.attributes.image.data.id,
                });
                if (res !== null) {
                    refresh();
                }
            }
            appService.changePreview([]);
        }
        //сохранение нескольких изображений

        if (files !== null) {
            const formData = new FormData();

            const linkApi = link === "categories" ? "category" : "product";

            for (let index = 0; index < files.length; index++) {
                formData.append("files", files[index]);
            }
            formData.append("ref", `api::${linkApi}.${linkApi}`);
            formData.append("refId", data ? data?.id : "");
            formData.append("field", "images");

            await changeImage({ token: authService.token, formData });

            appService.changeArrPreviews([]);
            setFiles(null);
        }
        setConfirmation(false);
        setLoading(false);
        // разобраться с обновлением данных и изображения!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // const timer = setTimeout(() => {
        //     console.log(data.attributes.image.data.attributes);
            refresh(); //обновляет страницу и получает новые данные с API
        // }, 1000);
        // return() => clearTimeout(timer);
        
    };

    const delEntry = async () => {
        setLoading(true);
        const res = await deleteEntry({ id: data.id, link: link, token: authService.token });

        if (data.attributes.image?.data !== null && data.attributes.image !== undefined) {
            const res = await deleteImage({
                token: authService.token,
                id: data.attributes.image.data.id,
            });
        }
        if (data.attributes.images?.data !== null && data.attributes.images !== undefined) {
            data.attributes.images.data.map(async (el: IDataImage) => {
                const res = await deleteImage({
                    token: authService.token,
                    id: el.id,
                });
            });
        }

        if (res) {
            router.push(`/admin/${link}`);
        }

        if (res === null) {
            authService.authorization(false, "");
            router.push("/admin");
        }
        setLoading(false);
    };

    return (
        <>
            <div
                className={s.card}
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                }}
            >
                {data.id !== "" && <p className={s.card__text}>ID: {data.id}</p>}
                <Input types="input" title="Название" name="name" className={s.card__input} type="text" value={name} setValue={setName} />
                <Input
                    types="input"
                    title="Ссылка (менять только при необходимости)"
                    name="title"
                    className={s.card__input}
                    type="text"
                    value={title}
                    setValue={setTitle}
                />
                {video !== undefined && (
                    <Input
                        types="input"
                        title="Ссылка на видео"
                        name="video"
                        className={s.card__input}
                        type="text"
                        value={video}
                        setValue={setVideo}
                    />
                )}

                <Input
                    types="textarea"
                    title="Описание"
                    name="description"
                    className={s.card__textarea}
                    value={description}
                    setValue={setDescription}
                />

                {link === "categories" && (
                    <ListProduct setListIdNotAdded={setListIdDisconnect} setListIdAdded={setListIdConnect} list={data.attributes.products.data} />
                )}

                {link === "products" && <SelectProduct setIdCategory={setIdCategory} idCategory={idCategory} />}

                <h2>Изображение</h2>
                <AddImages setFiles={setFile} type="one" label="photo" preview={preview} width={500} height={375} />

                {data.attributes.category && (
                    <>
                        <h2>Галерея</h2>
                        <AddImages
                            setFiles={setFiles}
                            type="many"
                            label="text"
                            labelText="Добавить фото в галерею"
                            preview=""
                            width={150}
                            height={120}
                        />

                        {data.attributes.images !== null && data.attributes.images !== undefined && (
                            <GalleryImage refresh={refresh} images={data.attributes.images?.data} />
                        )}
                    </>
                )}
                <CardButtons
                    setConfirmation={setConfirmation}
                    changePublished={changePublished}
                    publishedAt={data.attributes.publishedAt}
                    deleteEntry={setConfirmationDel}
                />
            </div>
            <Confirmation
                text="Предыдущие данные будут потеряны, сохранить изменения?"
                active={confirmation}
                setActive={setConfirmation}
                functionConfirmation={saveChange}
                loading={loading}
            />
            <Confirmation
                text="Вы точно хотите удалить запись?"
                active={confirmationDel}
                setActive={setConfirmationDel}
                functionConfirmation={delEntry}
                loading={loading}
            />
        </>
    );
};

export default CardUpdate;
