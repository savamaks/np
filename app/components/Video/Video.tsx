import React, { FC } from "react";
import s from "./Video.module.scss";

interface IProps {
    src: string;
    title: string;
}
const Video: FC<IProps> = ({ src, title }) => {
    return (
        <div className={s.container}>
            <iframe
                className={s.container__iframe}
                src={src}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Video;
