import React from "react";
import Layout from "@/app/components/layout/layout";
import s from "./page.module.scss";
import cn from "classnames";
import Image from "next/image";
import { IReview, arrRewiews } from "@/data";
import star from "@/public/star.svg";
import Link from "next/link";
import FormTelegram from "../components/FormTelegram/FormTelegram";
import { Metadata } from "next";
import LogIn from "../components/LogIn/LogIn";
import { prisma } from "@/prisma/prisma";
import ChangeCategory from "../components/changeCategory/changeCategory";

export const metadata: Metadata = {
    title: "Админ панель",
    twitter: {
        card: "summary",
    },
};

const getCategory = async () => {
    const category = await prisma.category.findMany();
    return category;
};

const AdminPage = async () => {
    const data = await getCategory();
    return (
        <Layout>
            <section className={cn(s.section)}>
                <ChangeCategory />
                {JSON.stringify(data)}
            </section>
        </Layout>
    );
};
export default AdminPage;
