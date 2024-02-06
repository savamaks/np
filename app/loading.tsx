import React from "react";
import Layout from "./components/layout/layout";
import s from "./loading.module.scss";

const Loading = () => {
    return (
       
            <section className={s.section}>
                <div className={s.loader}></div>
            </section>
    );
};

export default Loading;
