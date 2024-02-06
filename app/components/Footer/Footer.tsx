import React from "react";
import s from "./Footer.module.scss";
import Contacts from "../Contacts/Contacts";

const Footer = () => {
    return (
        <footer className={s.footer}>
            <Contacts />
        </footer>
    );
};

export default Footer;
