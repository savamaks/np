"use client";
import React from "react";
import s from "./Contacts.module.scss";
import cn from "classnames";
import Image from "next/image";
import telegram from "@/public/tel.svg";
import whatsapp from "@/public/what.svg";
import Link from "next/link";

const Contacts = () => {
    return (
        <div id="contacts" className={cn(s.cont)}>
            <Link className={cn(s.cont__phone)} href="tel:+79602136949">
                +7 (960) 213-69-49
            </Link>
            <Link href="https://t.me/maxsavinec" target='_blank'>
                <Image className={cn(s.cont__image)} src={telegram} alt="telegram"  width={50} height={50}/>
            </Link>
            <Link href="https://wa.me/79602136949" target="_blank">
                <Image className={cn(s.cont__image)} src={whatsapp} alt="telegram"  width={50} height={50}/>
            </Link>
        </div>
    );
};

export default Contacts;
