"use client";

import { ICategory, IDataImage, IImage, INewData, IProduct } from "@/app/types";
import React, { MouseEvent, ChangeEvent, FC, useEffect, useState } from "react";
import s from "./CardUpdate.module.scss";
import Button from "@/app/components/Button/Button";
import Modal from "../Modal/Modal";
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

interface IProps {
    link: string;
    dataCategories: Array<ICategory>;
    saveChange: (value: any) => void;
    refresh: () => void;
    setConfirmation: (value: boolean) => void;
    confirmation: boolean;
    data: ICategory | IProduct;
}
const CardUpdate: FC<IProps> = ({ refresh, dataCategories, setConfirmation, confirmation, data, link }) => {
    console.log(data);
    const [name, setName] = useState(data.attributes.name);
    const [title, setTitle] = useState(data.attributes.title);
    const [description, setDescription] = useState(data.attributes.description);
    const [video, setVideo] = useState(data.attributes.video);

    const [preview, setPreview] = useState(
        data.attributes.image.data
            ? `https://wclouds.ru${data.attributes.image.data.attributes.url}`
            : "https://wclouds.ru/uploads/free_icon_image_editing_8304794_ce7538248f.png"
    );

    const [files, setFiles] = useState<FileList | null>(null);
    const [file, setFile] = useState<FileList | null>(null);
    // const [productsList, setProductsList] = useState(data.attributes.products ? data.attributes.products?.data : null);
    const [listcategoryes, setListcategoryes] = useState(dataCategories);
    const [idCategory, setIdCategory] = useState(
        data.attributes.category !== undefined ? (data.attributes.category?.data !== null ? data.attributes.category?.data.id : null) : null
    );
    const [listIdConnect, setListIdConnect] = useState<Array<string>>([]);
    const [listIdDisconnect, setListIdDisconnect] = useState<Array<string>>([]);

    const { authService, appService } = useStore();

    // const [activeBtn, setActiveBtn] = useState(false);

    const router = useRouter();

    // useEffect(() => {
    //     if (
    //         name !== category.attributes.name ||
    //         title !== category.attributes.title ||
    //         description !== category.attributes.description ||
    //         preview !== `https://wclouds.ru${category.attributes.image.data.attributes.url}` ||
    //         idCategory !== category.attributes.category?.data.id ||
    //         listIdConnect.length > 0 ||
    //         listIdDisconnect.length > 0
    //     ) {
    //         setActiveBtn(true);
    //     } else {
    //         setActiveBtn(false);
    //     }
    // }, [name, title, description, preview, idCategory]);

    useEffect(() => {
        if (!authService.login) {
            router.push("/admin");
        }
    }, [authService.login]);

    const changePublished = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const time = new Date().toLocaleDateString().split(".").reverse().join("-");

        console.log(time);
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
        e.preventDefault();
        const newData: INewData = {
            name: name,
            title: title,
            description: description,
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

            await changeImage({ token: authService.token, formData, router, authorization: authService.authorization });

            if (data.attributes.image?.data !== null && data.attributes.image !== undefined) {
                const res = await deleteImage({
                    token: authService.token,
                    id: data.attributes.image.data.id,
                    router,
                    authorization: authService.authorization,
                });
                if (res.data !== null) {
                    refresh();
                }
            }
            appService.changePreview([]);
        }

        if (files !== null) {
            const formData = new FormData();

            const linkApi = link === "categories" ? "category" : "product";

            for (let index = 0; index < files.length; index++) {
                formData.append("files", files[index]);
            }
            formData.append("ref", `api::${linkApi}.${linkApi}`);
            formData.append("refId", data ? data?.id : "");
            formData.append("field", "images");

            await changeImage({ token: authService.token, formData, router, authorization: authService.authorization });

            appService.changeArrPreviews([]);
        }
        setConfirmation(false);

        refresh(); //обновляет страницу и получает новые данные с API
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
                <Input title="Название" name="name" className={s.card__input} type="text" value={name} setValue={setName} />
                <Input
                    title="Ссылка (менять только при необходимости)"
                    name="title"
                    className={s.card__input}
                    type="text"
                    value={title}
                    setValue={setTitle}
                />
                {video !== undefined && (
                    <Input title="Ссылка на видео" name="video" className={s.card__input} type="text" value={video} setValue={setVideo} />
                )}

                <label htmlFor="description">Описание</label>
                <textarea
                    name="description"
                    className={s.card__textarea}
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setDescription(e.target.value);
                    }}
                />

                {link === "categories" && (
                    <ListProduct setListIdNotAdded={setListIdDisconnect} setListIdAdded={setListIdConnect} list={data.attributes.products.data} />
                )}

                {link === "products" && <SelectProduct setIdCategory={setIdCategory} idCategory={idCategory} listCategories={listcategoryes} />}

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

                        {data.attributes.images !== null && data.attributes.images !== undefined  && (
                            <GalleryImage refresh={refresh} images={data.attributes.images?.data} />
                        )}
                    </>
                )}
                <div className={s.card__box}>
                    <Button
                        onClick={() => {
                            setConfirmation(true);
                        }}
                        // disabled={!activeBtn}
                        className={s.savebtn}
                    >
                        Сохранить
                    </Button>
                    <Button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            router.back();
                            appService.changeArrPreviews([]);
                        }}
                        className={s.savebtn}
                    >
                        Выйти
                    </Button>
                    <Button
                        onClick={changePublished}
                        type="noBorder"
                        className={cn(s.card__published, data.attributes.publishedAt !== null ? "" : s.card__draft)}
                    >
                        {data.attributes.publishedAt !== null ? "опубликован" : "неопубликован"}
                    </Button>
                </div>
            </div>
            <Modal
                active={confirmation}
                onClick={() => {
                    setConfirmation(false);
                }}
            >
                <div
                    className={s.confirmation}
                    onClick={(e: MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation();
                    }}
                >
                    <p>Предыдущие данные будут потеряны, сохранить изменения?</p>
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

export default CardUpdate;
