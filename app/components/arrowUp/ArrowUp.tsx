"use client";
import React from "react";
import s from "./ArrowUp.module.scss";
import Link from "next/link";
import { useScroll } from "@/app/Hooks/useScroll";
import cn from "classnames";

const ArrowUp = () => {
    const y = useScroll();
    const style = cn(s.arrow, y !== null && y > 200 ? s.active : s.deactive);
    return (
        <Link href="#header">
            <button className={style}></button>
        </Link>
    );
};

export default ArrowUp;
