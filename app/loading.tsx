import React from "react";
import Layout from "./components/layout/layout";
import s from "./styles/loading.module.scss";

const Loading = () => {
    return (
        <Layout>
            <section className={s.section}>
                <div className={s.loader}></div>
            </section>
        </Layout>
    );
};

export default Loading;
