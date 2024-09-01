"use client";

import React, { FC, MouseEvent } from "react";
import s from "./GalleryImage.module.scss";
import { IDataImage } from "@/app/types";
import Image from "next/image";
import Button from "../../Button/Button";
import basket from "@/public/basket.svg";
import { deleteImage } from "@/app/_handlerFunc/admin/deleteImage";
import { useStore } from "../../store/useStore";

interface IProps {
    images: Array<IDataImage>;
    refresh?: () => void;
}

const GalleryImage: FC<IProps> = ({ images, refresh }) => {
    const { authService } = useStore();

    return (
        <div className={s.container}>
            {images !== null &&
                images.map((el: IDataImage, index: number) => {
                    const srcImage = el.attributes.formats
                        ? el.attributes.formats.small
                            ? el.attributes.formats.small.url
                            : el.attributes.url
                        : el.attributes.url;
                    return (
                        <div className={s.container__box} key={index}>
                            <Image className={s.container__box_image} alt="" src={`https://wclouds.ru${srcImage}`} width={200} height={150} />
                            <Button
                                onClick={async (e: MouseEvent<HTMLButtonElement>) => {
                                    e.preventDefault();
                                    await deleteImage({ token: authService.token, id: el.id });
                                    if (refresh) {
                                        refresh();
                                    }
                                }}
                                className={s.container__box_button}
                            >
                                <Image src={basket} alt="удалить" title="удалить изображение" width={50} height={50} />
                            </Button>
                        </div>
                    );
                })}
        </div>
    );
};

export default GalleryImage;
