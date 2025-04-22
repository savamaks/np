
import React from "react";
import s from "./Contacts.module.scss";
import cn from "classnames";
import Image from "next/image";
import telegram from "@/public/tel.svg";
import whatsapp from "@/public/what.svg";
import Link from "next/link";
import telephone from '@/public/telephone.svg'

const Contacts = () => {
    return (
        <div id="contacts" className={cn(s.cont)}>
            <Link className={cn(s.cont__phone)} href="tel:+79602136949" title="Номер телефона">
                +7 (960) 213-69-49
                {/* <Image title="+7 (960) 213-69-49" className={cn(s.cont__image)} src={telephone} alt="telephone" width={50} height={50}/> */}

            </Link>
            <Link href="https://t.me/MaximSavinec" target='_blank' title="Ссылка на телеграм">
                <Image className={cn(s.cont__image)} src={telegram} alt="telegram"  width={50} height={50}/>
            </Link>
            <Link href="https://wa.me/79602136949" target="_blank" title="Ссылка на WhatsApp">
                <Image className={cn(s.cont__image)} src={whatsapp} alt="WhatsApp"  width={50} height={50}/>
            </Link>
        </div>
    );
};

export default Contacts;
