"use client";
import React, { FC, ReactNode, useState } from "react";
import s from "./Burger.module.scss";
import cn from "classnames";

const Burger = ({ setActive, active }: any) => {
    return (
        <button onClick={setActive} className={cn(s.burger, `${active ? s.active : ""}`)}>
            <div className={cn(s.burger__line, `${active ? s.up : ""}`)}></div>
            <div className={cn(s.burger__line, `${active ? s.center : ""}`)}></div>
            <div className={cn(s.burger__line, `${active ? s.down : ""}`)}></div>
        </button>
    );
};

export default Burger;
