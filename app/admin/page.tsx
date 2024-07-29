"use client";
import Auth from "../components/adminPanel/Auth/Auth";
import s from "./page.module.scss";
import auth from "../components/store/auth";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPage = observer(() => {
    const router = useRouter();

    useEffect(() => {
        if (auth.login) {
            router.push("admin/categories");
        }
    }, []);
    return <section className={s.section}>{!auth.login && <Auth />}</section>;
});

export default AdminPage;
