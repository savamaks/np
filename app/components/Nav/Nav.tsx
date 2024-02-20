"use client";

import Link from "next/link";
import React, {  FC } from "react";
import s from "./Nav.module.scss";

interface IProps {
    setActive?: () => void;
}
const Nav: FC<IProps> = ({ setActive }) => {
    return (
        <nav className={s.nav}>
            <Link onClick={setActive} className={s.nav_link} href="/">
                Главная
            </Link>
            <Link onClick={setActive} className={s.nav_link} href="/services">
                Услуги
            </Link>
            <Link onClick={setActive} className={s.nav_link} href="/works">
                Наши работы
            </Link>
            <Link onClick={setActive} className={s.nav_link} href="/reviews">
                Отзывы
            </Link>
            <Link onClick={setActive} className={s.nav_link} href="#contacts">
                Контакты
            </Link>
        </nav>
    );
};

export default Nav;
