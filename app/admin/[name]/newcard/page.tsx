"use client";
import React, { useState, useEffect } from "react";
import s from "./page.module.scss";
import AddImages from "@/app/components/adminPanel/AddImages/AddImages";
import Input from "@/app/components/adminPanel/Input/Input";
import ListProduct from "@/app/components/adminPanel/ListProduct/ListProduct";
import SelectProduct from "@/app/components/adminPanel/SelectProduct/SelectProduct";
import { ICategory, INewData, IProduct } from "@/app/types";
import { useStore } from "@/app/components/store/useStore";
import CardButtons from "@/app/components/adminPanel/CardButtons/CardButtons";
import Confirmation from "@/app/components/adminPanel/Confirmation/Confirmation";
import { createData } from "@/app/_handlerFunc/admin/createData";
import { changeImage } from "@/app/_handlerFunc/admin/changeImage";
import { useRouter } from "next/navigation";

interface IProps {
    token: string;
    name: string;
}
const getData = async ({ token, name }: IProps) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/${name}?populate=*&publicationState=preview`, {
            method: "GET",
            next: {
                revalidate: 0,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 401) {
            return null;
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const NewCardPage = ({ params }: { params: { name: string } }) => {
    const [data, setData] = useState<Array<IProduct | ICategory>>();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/uploads/free_icon_image_editing_8304794_ce7538248f.png`);

    const [listIdConnect, setListIdConnect] = useState<Array<string>>([]);
    const [listIdDisconnect, setListIdDisconnect] = useState<Array<string>>([]);

    const [idCategory, setIdCategory] = useState<string | null>(null);

    const [files, setFiles] = useState<FileList | null>(null);
    const [file, setFile] = useState<FileList | null>(null);
    const [confirmation, setConfirmation] = useState(false);

    const router = useRouter();
    const { authService, appService } = useStore();

    const api = async () => {
        let link = "";
        if (params.name === "categories") {
            link = "products";
        } else {
            link = "categories";
        }
        const res = await getData({ token: authService.token, name: link });
        if (res === null) {
            return;
        } else {
            setData(res);
        }
    };

    useEffect(() => {
        api();
    }, []);
    const saveChange = async () => {
        setLoading(true);

        if (name !== "" && title !== "" && description !== "") {
            const data: INewData = {
                name: name,
                title: title,
                description: description,
                publishedAt: null,
            };

            if (idCategory !== null) {
                data.category = {
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

            if (listIdConnect.length > 0) {
                data.products = {
                    connect: listIdConnect,
                };
            }
            const res = await createData({ data, link: params.name, token: authService.token });
            if (res !== null) {
                if (file !== null) {
                    const formData = new FormData();

                    const linkApi = params.name === "categories" ? "category" : "product";

                    formData.append("files", file[0]);
                    formData.append("ref", `api::${linkApi}.${linkApi}`);
                    formData.append("refId", res.id);
                    formData.append("field", "image");

                    await changeImage({ token: authService.token, formData });

                    appService.changePreview([]);
                }
                if (files !== null) {
                    const formData = new FormData();

                    const linkApi = params.name === "categories" ? "category" : "product";

                    for (let index = 0; index < files.length; index++) {
                        formData.append("files", files[index]);
                    }
                    formData.append("ref", `api::${linkApi}.${linkApi}`);
                    formData.append("refId", res.id);
                    formData.append("field", "images");

                    await changeImage({ token: authService.token, formData });

                    appService.changeArrPreviews([]);
                }
                router.push(`${res.id}`);
            }
        }
        setConfirmation(false);
        setLoading(false);
    };
    return (
        <>
            <div className={s.card}>
                <Input setValue={setName} value={name} name="name" title="Имя" types="input" />
                <Input setValue={setTitle} value={title} name="title" title="Ссылка" types="input" />
                {params.name === "products" && <Input setValue={setVideo} value={video} name="video" title="Ссылка на видео" types="input" />}
                <Input setValue={setDescription} value={description} name="description" title="Описание" types="textarea" />

                {params.name === "categories" && <ListProduct setListIdNotAdded={setListIdDisconnect} setListIdAdded={setListIdConnect} list={[]} />}
                {params.name === "products" && <SelectProduct setIdCategory={setIdCategory} idCategory={idCategory} />}

                <h2>Изображение</h2>
                <AddImages setFiles={setFile} type="one" label="photo" preview={preview} width={500} height={375} />
                {params.name === "products" && (
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
                    </>
                )}
                <CardButtons setConfirmation={setConfirmation} publishedDisable={true} />
                <Confirmation
                    loading={loading}
                    text="Предыдущие данные будут потеряны, сохранить изменения?"
                    active={confirmation}
                    setActive={setConfirmation}
                    functionConfirmation={saveChange}
                />
            </div>
        </>
    );
};

export default NewCardPage;
