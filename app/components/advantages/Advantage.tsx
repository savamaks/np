import React from "react";
import s from "./Advantage.module.scss";
import galka from "../../../public/galka.png";
import Image from "next/image";
import potolok from "../../../public/3.jpg";
import cn from "classnames";

const Advantage = () => {
    return (
        <section className={s.section}>
            <h1 className={cn(s.section__title)}>Преимущества Натяжных Потолков</h1>
            <div className={s.cont}>
                <div className={s.section__block}>
                    <div className={s.box}>
                        <Image className={s.box__card} src={galka} alt="galka" />
                        <h2 className={s.box__text}>Низкая стоимость</h2>
                    </div>
                    <div className={s.box}>
                        <Image className={s.box__card} src={galka} alt="galka" />
                        <h2 className={s.box__text}>Быстрый монтаж</h2>
                    </div>
                    <div className={s.box}>
                        <Image className={s.box__card} src={galka} alt="galka" />
                        <h2 className={s.box__text}>Простота конструкции</h2>
                    </div>
                    <div className={s.box}>
                        <Image className={s.box__card} src={galka} alt="galka" />
                        <h2 className={s.box__text}>Эстетичность</h2>
                    </div>
                    <div className={s.box}>
                        <Image className={s.box__card} src={galka} alt="galka" />
                        <h2 className={s.box__text}>Долгий срок эксплуатации</h2>
                    </div>
                    <div className={s.box}>
                        <Image className={s.box__card} src={galka} alt="galka" />
                        <h2 className={s.box__text}>Влагозащита</h2>
                    </div>
                    <div className={s.box}>
                        <Image className={s.box__card} src={galka} alt="galka" />
                        <h2 className={s.box__text}>Не требует подготовки основной поверхности потолка</h2>
                    </div>
                </div>
                <Image className={s.section__image} src={potolok} alt="" width={1200} height={900} placeholder="blur" />
            </div>
        </section>
    );
};

export default Advantage;
