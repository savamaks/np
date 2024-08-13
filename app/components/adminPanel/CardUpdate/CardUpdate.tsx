"use client";

import { ICategory, IDataImage, IImage, IProduct } from "@/app/types";
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

interface IProps {
    id: string;
    names: string;
    titles: string;
    descriptions: string;
    previews: string;
    link: string;
    dataCategories: Array<ICategory>;
    productsList?: Array<IProduct> | null;
    category: ICategory | null;
    saveChange: (value: any) => void;
    refresh?: () => void;
    image: IImage | null;
    images: Array<IDataImage> | null;
    idCat: string | null;
    setConfirmation: (value: boolean) => void;
    confirmation: boolean;
}
const CardUpdate: FC<IProps> = ({
    images,
    category,
    productsList,
    image,
    id,
    link,
    refresh,
    names,
    titles,
    descriptions,
    previews,
    idCat,
    dataCategories,
    saveChange,
    setConfirmation,
    confirmation,
}) => {
    const [name, setName] = useState(names);
    const [title, setTitle] = useState(titles);
    const [description, setDescription] = useState(descriptions);
    const { authService,appService } = useStore();

    // const [activeBtn, setActiveBtn] = useState(false);
    const [preview, setPreview] = useState(previews);

    const [files, setFiles] = useState<FileList | null>(null);
    const [file, setFile] = useState<FileList | null>(null);

    const [listcategoryes, setListcategoryes] = useState(dataCategories);

    const [idCategory, setIdCategory] = useState(idCat);
    const [listIdConnect, setListIdConnect] = useState<Array<string>>([]);
    const [listIdDisconnect, setListIdDisconnect] = useState<Array<string>>([]);

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
    // const saveChange = async (e: MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     const data: INewData = {
    //         name: name,
    //         title: title,
    //         description: description,
    //     };
    //     if (idCategory !== null) {
    //         data.category = {
    //             connect: [
    //                 {
    //                     id: idCategory,
    //                     position: {
    //                         start: true,
    //                     },
    //                 },
    //             ],
    //         };
    //     }
    //     if (link === "categoryes") {
    //         data.products = {
    //             connect: listIdConnect,
    //             disconnect: listIdDisconnect,
    //         };
    //     }
    //     const result = await saveChangeCategory({ data, id: id, link, token: auth.token });

    //     //сохранение изображения

    //     if (file !== null) {
    //         const formData = new FormData();

    //         const linkApi = link === "categoryes" ? "category" : "product";

    //         formData.append("files", file[0]);
    //         formData.append("ref", `api::${linkApi}.${linkApi}`);
    //         formData.append("refId", id);
    //         formData.append("field", "image");

    //         await changeImage(auth.token, formData);
    //         if (image) {
    //             await deleteImage(auth.token, image.data.id);
    //         }
    //     }

    //     if (files !== null) {
    //         const formData = new FormData();

    //         const linkApi = link === "categoryes" ? "category" : "product";

    //         for (let index = 0; index < files.length; index++) {
    //             formData.append("files", files[index]);
    //         }
    //         formData.append("ref", `api::${linkApi}.${linkApi}`);
    //         formData.append("refId", id);
    //         formData.append("field", "images");

    //         await changeImage(auth.token, formData);

    //         auth.changeArrPreviews([]);
    //     }
    //     setConfirmation(false);
    //     if (refresh) {
    //         refresh(); //обновляет страницу и получает новые данные с API
    //     }
    // };
    return (
        <>
            <div
                className={s.card}
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                }}
            >
                <p className={s.card__text}>ID: {id}</p>
                <Input title="Название" name="name" className={s.card__input} type="text" value={name} setValue={setName} />
                <Input
                    title="Ссылка (менять только при необходимости)"
                    name="title"
                    className={s.card__input}
                    type="text"
                    value={title}
                    setValue={setTitle}
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
                {productsList !== null && (
                    <ListProduct setListIdNotAdded={setListIdDisconnect} setListIdAdded={setListIdConnect} list={productsList ? productsList : []} />
                )}

                {listcategoryes.length > 0 && category && (
                    <SelectProduct setIdCategory={setIdCategory} idCategory={idCategory} listCategories={listcategoryes} />
                )}

                <h2>Изображение</h2>
                <AddImages setFiles={setFile} type="one" label="photo" preview={preview} width={500} height={375} />

                {category && (
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

                        {images !== null && <GalleryImage refresh={refresh} images={images} />}
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
                        <Button
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                saveChange({ files, file, name, title, description, idCategory, listIdConnect, listIdDisconnect });
                            }}
                        >
                            ok
                        </Button>
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
