import Link from "next/link";
import React from "react";
import s from "./Nav.module.scss";

const Nav = () => {
    return (
        <nav className={s.nav}>
            <Link className={s.nav_link} href="/">
                Главная
            </Link>
            <Link className={s.nav_link} href="/services">
                Услуги
            </Link>
            <Link className={s.nav_link} href="/works">
                Наши работы
            </Link>
            <Link className={s.nav_link} href="/reviews">
                Отзывы
            </Link>
        </nav>
    );
};

export default Nav;
