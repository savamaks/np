"use client";
import React, { FC } from "react";
import s from "./Burger.module.scss";
import cn from "classnames";

interface IProps {
    setActive: () => void;
    active: boolean;
}

const Burger: FC<IProps> = ({ setActive, active }) => {
    return (
        <button onClick={setActive} className={cn(s.burger, `${active ? s.active : ""}`)}>
            <div className={cn(s.burger__line, `${active ? s.up : ""}`)}></div>
            <div className={cn(s.burger__line, `${active ? s.center : ""}`)}></div>
            <div className={cn(s.burger__line, `${active ? s.down : ""}`)}></div>
        </button>
    );
};

export default Burger;
