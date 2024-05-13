import React from "react";
import Layout from "./components/layout/layout";
import s from "@/app/styles/NotFound.module.scss";
import Link from "next/link";
import Image from "next/image";
import emot from "@/public/emot.svg";
import FormTelegram from "./components/FormTelegram/FormTelegram";

const NotFound = async () => {
    return (
        <>
            <main className={s.section}>
            <FormTelegram />

                <svg height="50%" version="1.1" viewBox="0 0 24 24" width="50%">
                    <g className={s.g} id="Social-/-5---Social,-emoticon,-neutral,-somewhat-icon">
                        <path
                            d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z"
                            id="Path"
                            className={s.svgOne}
                        ></path>
                        <line id="Path" stroke="#f2f2f2" x1="15.0043926" x2="15" y1="8" y2="8" className={s.svgTwo}></line>
                        <line id="Path" stroke="#f2f2f2" x1="9.00439261" x2="9" y1="8" y2="8" className={s.svgThree}></line>
                        <line id="Path" stroke="#f2f2f2" x1="9" x2="15" y1="15" y2="15" className={s.svgFour}></line>
                    </g>
                </svg>

                <h1 className={s.section__text}>
                    К сожалению данной страницы не существует, перейдите на{" "}
                    <Link className={s.link} href={"/"}>
                        главную
                    </Link>
                </h1>
            </main>
        </>
    );
};

export default NotFound;
