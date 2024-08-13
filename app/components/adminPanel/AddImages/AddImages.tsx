"use client";

import React, { ChangeEvent, FC } from "react";
import s from "./AddImages.module.scss";
import Image from "next/image";
import cn from "classnames";
import { useStore } from "../../store/useStore";

interface IProps {
    type: "one" | "many";
    label: "photo" | "text";
    labelText?: string;
    preview: string;
    width: number;
    height: number;
    setFiles: (value: FileList) => void;
}
const AddImages: FC<IProps> = ({ type, label, labelText, preview, width, height, setFiles }) => {
    // const [previews, setPreviews] = useState<Array<string>>([]);
    const { appService } = useStore();

    const previews = appService.arrPreviews;
    const previewMobx = appService.prewiew;

    const uploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files !== null) {
            setFiles(e.target.files);

            const arrImages: Array<string> = [];

            for (let index = 0; index < e.target.files.length; index++) {
                const urlImage = URL.createObjectURL(e.target.files[index]);
                arrImages.push(urlImage);
            }
            // setPreviews(arrImages);
            if (type === "one") {
                appService.changePreview(arrImages);
            } else {
                appService.changeArrPreviews(arrImages);
            }
        }
    };
    return (
        <div className={s.container}>
            <label className={cn(s.container__label, type === "one" ? s.container__labelOne : "")} htmlFor={`input__files${type}`}>
                {label === "text" ? (
                    labelText
                ) : (
                    <Image
                        className={s.container__image}
                        width={width}
                        height={height}
                        src={previewMobx.length > 0 ? previewMobx[0] : preview}
                        alt=""
                    />
                )}
            </label>
            {previews.length > 0 && type === "many" && (
                <div className={s.container__box}>
                    {previews.map((el: string, index: number) => {
                        return <Image key={index} className={s.container__box_image} width={width} height={height} src={el} alt="" />;
                    })}
                </div>
            )}

            <input
                className={s.container__input}
                multiple={type === "many" ? true : false}
                type="file"
                onChange={uploadFiles}
                id={`input__files${type}`}
            />
        </div>
    );
};

export default AddImages;
