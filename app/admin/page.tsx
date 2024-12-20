"use client";
import Auth from "../components/adminPanel/Auth/Auth";
import s from "./page.module.scss";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../components/store/useStore";

const AdminPage = observer(() => {
    const router = useRouter();
    const {authService} = useStore();

    useEffect(() => {
        if (authService.login) {
            router.push("admin/categories");
        }
    }, []);

    return (
        <>
           {!authService.login && <Auth/>}
        </>
    );
});

export default AdminPage;
