import React from "react";
import Layout from "./components/layout/layout";
import s from "./page.module.scss";
import cn from "classnames";
import Image from "next/image";
import photo from "@/public/imagesWork/IMG_20191223_204535.jpg";
import Link from "next/link";
import Advantage from "./components/advantages/Advantage";
import FormTelegram from "./components/FormTelegram/FormTelegram";

export default function Home() {
    return (
        <Layout>
            <main className={s.main}>
                <section className={s.section}>
                    <Image className={s.section__image} src={photo} alt="image" width={1200} height={900} placeholder="blur" />

                    <div className={s.cont}>
                        <div className={cn(s.section__block)}>
                            <div className={cn(s.section__cont)}>
                                <h1 className={cn(s.section__cont_title)}>Н</h1>
                                <h1 className={cn(s.section__cont_title)}>а</h1>
                                <h1 className={cn(s.section__cont_title)}>т</h1>
                                <h1 className={cn(s.section__cont_title)}>я</h1>
                                <h1 className={cn(s.section__cont_title)}>ж</h1>
                                <h1 className={cn(s.section__cont_title)}>н</h1>
                                <h1 className={cn(s.section__cont_title)}>ы</h1>
                                <h1 className={cn(s.section__cont_title)}>е</h1>

                            </div>

                            <h1 className={cn(s.section__title)}>Потолки</h1>
                        </div>

                        <p className={s.section__text}>
                            Производим установку натяжных потолков в Петрозаводске, Кондопоге и соседних районах по выгодным ценам. Занимаемся
                            производством потолочных конструкций из качественых матералов.
                        </p>

                        <FormTelegram />
                    </div>
                </section>
                <Advantage />
            </main>
        </Layout>
    );
}
