import React from "react";
import s from "./page.module.scss";
import Layout from "../components/layout/layout";

const About = () => {
    return (
        <Layout>
            <section className={s.cont}>
                <div className={s.cont__img}></div>
            </section>
        </Layout>
    );
};

export default About;
