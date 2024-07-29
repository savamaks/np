"use client";
import React, { ChangeEvent, useState, MouseEvent, useEffect, FC } from "react";
import s from "./Create.module.scss";
import Image from "next/image";
import fon from "@/public/fon.png";
import Button from "@/app/components/Button/Button";
import Modal from "../../Modal/Modal";

interface IProps {
    upModal: (a: boolean) => void;
}
const Create: FC<IProps> = ({ upModal }) => {
    const [preview, setPreview] = useState("");
    const [files, setFiles] = useState<null | FileList>(null);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [active, setActive] = useState(false);
    const [change, setChange] = useState(false);
    const [modal, setModal] = useState(false);

    const createCategory = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
        if (name !== "" && description !== "" && link !== "" && preview !== "") {
            setActive(true);
        } else {
            setActive(false);
        }

        if (name !== "" || description !== "" || link !== "" || preview !== "") {
            setChange(true);
        } else {
            setChange(false);
        }
    }, [name, description, link, preview]);

    return (
        <>
            <form
                className={s.form}
                onClick={(e: MouseEvent<HTMLFormElement>) => {
                    e.stopPropagation();
                }}
            >
                <h2 className={s.form__title}>Создание новой категории</h2>
                <div className={s.form__box}>
                    <label className={s.form__box_label} htmlFor="">
                        Название
                    </label>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                        }}
                        className={s.form__box_input}
                        type="text"
                        value={name}
                    />
                </div>
                <div className={s.form__box}>
                    <label className={s.form__box_label} htmlFor="">
                        Ссылка
                    </label>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setLink(e.target.value);
                        }}
                        className={s.form__box_input}
                        type="text"
                        value={link}
                    />
                </div>
                <div className={s.form__box}>
                    <label className={s.form__box_label} htmlFor="">
                        Описание
                    </label>
                    <textarea
                        name="description"
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setDescription(e.target.value);
                        }}
                        className={s.form__box_textarea}
                        value={description}
                    />
                </div>
                <div className={s.form__box}>
                    <label className={s.form__box_labelimage} htmlFor="input__file">
                        <Image className={s.form__box_image} width={500} height={375} src={preview !== "" ? preview : fon} alt="" />
                    </label>
                    <input className={s.form__box_inputimage} type="file" onChange={uploadFile} id="input__file" />
                </div>
                <div className={s.form__block}>
                    <Button disabled={!active} onClick={createCategory}>
                        Создать
                    </Button>
                    <Button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            if (change) {
                                setModal(true);
                            } else {
                                upModal(false);
                            }
                        }}
                    >
                        Отмена
                    </Button>
                </div>
            </form>
            <Modal
                active={modal}
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                }}
            >
                <div className={s.modal}>
                    <p className={s.modal__text}>Изменения не сохраняться, точно хотите закрыть?</p>
                    <div className={s.modal__box}>
                        <Button
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                upModal(false);
                                setModal(false);
                                setName("");
                                setLink("");
                                setDescription("");
                                setPreview("");
                            }}
                        >
                            Да
                        </Button>
                        <Button
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                setModal(false);
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

export default Create;

// import React, { useState } from "react";

// const Create = () => {
//     const [selectedFile, setSelectedFile] = useState<any>(null);

//     const [name, setName] = useState("");
//     const [title, setTitle] = useState("");
//     const [desc, setDescription] = useState("");

//     const handleFileChange = (event: any) => {
//         setSelectedFile(event.target.files);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             console.error("Please select a file first.");
//             return;
//         }
//         const trys = {
//             name: "four",
//         };
//         const formData = new FormData();

//         for (let index = 0; index < selectedFile.length; index++) {
//             formData.append("files.media", selectedFile[index]);
//         }

//         formData.append("data", JSON.stringify(trys));

//         try {
//             const response = await fetch("http://localhost:1337/api/cats", {
//                 // URL вашего Strapi сервера
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer 0cc84c66a60fa6d54e473a5ec3d99d1e366e4c91e17c63e762accb93382081b9e0599ed72663d443079e0b7dfb1803fa690faefebf7a6b91abb0b0a6dff05fd9c78f1d90458e6e1d8bffa2b6dc65ed9626ec725db3bb82d12ba9852db5c1e3537124941380b10b6afaac5085695560a8132a3b3a836f0c5fca4f7994a9c506bf`,
//                 },
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error(`Error uploading file: ${response.statusText}`);
//             }

//             const data = await response.json();
//             console.log("File uploaded successfully:", data);
//         } catch (error) {
//             console.error("Error during file upload:", error);
//         }
//     };
//     return (
//         <div>
//             <h1>Upload File</h1>
//             <input type="file" multiple onChange={handleFileChange} />

//             <button onClick={handleUpload}>Upload File</button>
//         </div>
//     );
// };

// export default Create;
