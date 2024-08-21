"use client";
import Link from "next/link";
import s from "./layout.module.scss";
import { usePathname } from "next/navigation";
import cn from "classnames";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const mainPath = "http://localhost:3030/admin/";
    const pathname = usePathname().split("/").reverse()[0];

    interface IListPath {
        name: string;
        link: string;
    }
    const listPath: Array<IListPath> = [
        { name: "Категории", link: "categories" },
        { name: "Продукты", link: "products" },
        { name: "Вопросы", link: "requests" },
    ];
    return (
        <section className={s.layout}>
            <nav className={s.layout__nav}>
                {listPath.map((el: IListPath,index:number) => {
                    return (
                        <Link key={index} className={cn(s.layout__nav_link, el.link === pathname && s.active)} href={`${mainPath}${el.link}`}>
                            {el.name}
                        </Link>
                    );
                })}
            </nav>
            <div className={s.layout__main}>{children}</div>
        </section>
    );
}
