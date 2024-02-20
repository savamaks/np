"use client";

import React, { useState } from "react";
import Link from "next/link";
import s from "./Header.module.scss";
import Burger from "../burger/burger/Burger";
import Nav from "../Nav/Nav";
import cn from "classnames";

const Header = () => {
    const [active, setActive] = useState(false);
    const [animate, setAnimate] = useState(false);

    const burgerClick = () => {
        console.log('object');
        setAnimate((prev) => !prev);
        if (active) {
            const timer = setTimeout(() => {
                setActive((prev) => !prev);
            }, 500);
            return () => clearTimeout(timer);
        }
        setActive((prev) => !prev);
    };
    return (
        <header className={cn(s.header,animate ? s.active : "")}>
            <Link className={cn(s.nav_link)} href="/">
                <svg className={s.header__logo} width="80" height="80" viewBox="0 0 100 100">
                    <g id="Слой_x0020_1">
                        <g>
                            <path
                                className={s.header__logo_path}
                                stroke="#f2f2f2"
                                fill="#f2f2f2"
                                d="M14 32l-4 6 24 -2 0 -32 13 -2 -1 90 -12 -5 0 -39 -21 0 0 28 -12 -7 1 -58 12 -2 0 23zm83 -19c-13,-6 -28,-12 -46,-12l0 90 14 -5 0 -71 -5 -4c9,3 18,5 26,10l0 51c5,-3 6,-1 12,-6l0 -53zm-50 11l-13 6 13 -6zm-13 2l13 -6 -13 6zm13 -9l-13 6 13 -6zm-13 2l13 -6 -13 6z"
                            />
                            <path
                                className={s.header__logo_path}
                                id="1"
                                stroke="#f2f2f2"
                                fill="#f2f2f2"
                                d="M14 32l-4 6 24 -2 0 -32 13 -2 -1 90 -12 -5 0 -39 -21 0 0 28 -12 -7 1 -58 12 -2 0 23zm83 -19c-13,-6 -28,-12 -46,-12l0 90 14 -5 0 -71 -5 -4c9,3 18,5 26,10l0 51c5,-3 6,-1 12,-6l0 -53zm-50 11l-13 6m0 -4l13 -6m0 -3l-13 6m0 -4l13 -6"
                            />
                        </g>
                    </g>
                </svg>
            </Link>
            <div className={s.box}>
                <Nav />
            </div>

            <Burger setActive={burgerClick} active={animate} />
            {active && (
                <div className={cn(s.menu, !animate && active ? s.close : "")}>
                    <Nav  setActive={burgerClick} />
                </div>
            )}
        </header>
    );
};

export default Header;
