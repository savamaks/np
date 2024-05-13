import React from "react";
import s from "./styles/loading.module.scss";

const Loading = () => {
    return (
        <>
            <section className={s.section}>
                <span className={s.loader}></span>
            </section>
        </>
    );
};

export default Loading;
