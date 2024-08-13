"use client";
import Link from "next/link";
import s from "./layout.module.scss";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        
                <section className={s.layout}>
                    <nav className={s.layout__nav}>
                        <Link className={s.layout__nav_link} href={"http://localhost:3030/admin/categories"}>
                            Категории
                        </Link>
                        <Link className={s.layout__nav_link} href={"http://localhost:3030/admin/products"}>
                            Продукты
                        </Link>
                    </nav>
                    <div className={s.layout__main}>{children}</div>
                </section>
        
    );
}
