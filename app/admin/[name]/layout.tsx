"use client";
import Link from "next/link";
import s from "./layout.module.scss";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className={s.layout}>
            <nav className={s.layout__nav}>
                <Link className={s.layout__nav_link} href={"categories"}>
                    Категории
                </Link>
                <Link className={s.layout__nav_link} href={"products"}>
                    Продукты
                </Link>
            </nav>
            <div className={s.layout__main}>{children}</div>
        </section>
    );
}
