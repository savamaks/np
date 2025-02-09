import React from "react";
import s from "./Sales.module.scss";
import FormTelegram from "../FormTelegram/FormTelegram";
import Image from "next/image";
import telephone from '@/public/telephone.svg'
import Contacts from "../Contacts/Contacts";

const getData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/sales`, {
            method: "GET",
            next: {
                revalidate: 300,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
            },
        });
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Sales = async () => {
    const data = await getData();
    return (
        <section className={s.container}>
            <h2 className={s.container__title}>Акции</h2>
            <p className={s.container__text}>Все условия акций и скидок узнавайте по телефону или в мессенджерах.</p>
            <Contacts/>
            <div className={s.box}>
                {data.data.map((el: any, index: number) => {
                    return (
                        <FormTelegram key={index} type="click" textSale={el.attributes.title}>
                            <div className={s.card} key={index}>
                                <h2 className={s.card__title}>{el.attributes.title}</h2>
                                <p className={s.card__text}>{el.attributes.description}</p>
                            </div>
                        </FormTelegram>
                    );
                })}
            </div>
        </section>
    );
};

export default Sales;
