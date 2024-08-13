"use client";
import React, { MouseEvent, ChangeEvent, useState } from "react";
import s from "./page.module.scss";
import AddImages from "@/app/components/adminPanel/AddImages/AddImages";
import GalleryImage from "@/app/components/adminPanel/GalleryImage/GalleryImage";
import Input from "@/app/components/adminPanel/Input/Input";
import ListProduct from "@/app/components/adminPanel/ListProduct/ListProduct";
import SelectProduct from "@/app/components/adminPanel/SelectProduct/SelectProduct";
import Button from "@/app/components/Button/Button";
import Modal from "@/app/components/Modal/Modal";
import router from "next/router";
import { title } from "process";
import CardUpdate from "@/app/components/adminPanel/CardUpdate/CardUpdate";
import { ICategory } from "@/app/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IPropsDataCat {
    setDataCategories: (value: Array<ICategory>) => void;
    router: AppRouterInstance;
    token: string;
    authorization: (value: boolean, valueTwo: string) => void;
}
const getDataCategories = async ({ setDataCategories, router,token,authorization }: IPropsDataCat) => {
    try {
        const res = await fetch(`https://wclouds.ru/api/categories`, {
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
            authorization(false, "");
            router.push("/admin");
        }
        const data = await res.json();
        setDataCategories(data.data);
    } catch (error) {
        console.log(error);
    }
};

const NewCardPage = ({ params }: { params: { name: string } }) => {
    // const [name, setName] = useState("");
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [files, setFiles] = useState<FileList | null>(null);
    // const [file, setFile] = useState<FileList | null>(null);
    // const [preview, setPreview] = useState("https://wclouds.ru/uploads/free_icon_image_editing_8304794_ce7538248f.png");
    // const [confirmation, setConfirmation] = useState(false);

    const [dataCategories, setDataCategories] = useState([]);

    return (
        <>
            {/* <CardUpdate
                names=""
                titles=""
                descriptions=""
                previews="https://wclouds.ru/uploads/free_icon_image_editing_8304794_ce7538248f.png"
                dataCategories={dataCategories}
                idCat={null}
                link={params.name}
            /> */}
            d
        </>
    );
};

export default NewCardPage;
