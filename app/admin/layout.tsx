"use client";
import { MouseEvent, useState } from "react";
import Link from "next/link";
import s from "./layout.module.scss";
import { usePathname, useRouter } from "next/navigation";
import cn from "classnames";
import Button from "@/app/components/Button/Button";
import { useStore } from "@/app/components/store/useStore";
import Confirmation from "@/app/components/adminPanel/Confirmation/Confirmation";
import loading from "@/app/loading";
import { UserIcon } from "@/app/components/IconsAnimate/UserIcon";
import { LogoutIcon } from "@/app/components/IconsAnimate/LogoutIcon";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const mainPath = `${process.env.NEXT_PUBLIC_URL}/admin/`;
    const [confirmation, setConfirmation] = useState(false);
    const pathname = usePathname().split("/").reverse()[0];
    const { authService } = useStore();
    const router = useRouter();

    interface IListPath {
        name: string;
        link: string;
    }
    const listPath: Array<IListPath> = [
        { name: "Категории", link: "categories" },
        { name: "Продукты", link: "products" },
        { name: "Вопросы", link: "requests" },
    ];

    const exitAccount = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        authService.authorization(false, "");
        router.push("admin");
    };

    return (
        <section className={s.layout}>
            {authService.login && (
                <div className={s.layout__cont}>
                    <nav className={s.layout__nav}>
                        {listPath.map((el: IListPath, index: number) => {
                            return (
                                <Link key={index} className={cn(s.layout__nav_link, el.link === pathname && s.active)} href={`${mainPath}${el.link}`}>
                                    {el.name}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className={s.layout__block}>
                        <Link href={`account`}>
                            <Button type="noBorder">
                                <UserIcon />
                            </Button>
                        </Link>
                        <Button
                            type="noBorder"
                            onClick={() => {
                                setConfirmation(true);
                            }}
                        >
                            <LogoutIcon />
                        </Button>
                        <Confirmation
                            text="Вы точно хотите выйти?"
                            active={confirmation}
                            setActive={setConfirmation}
                            functionConfirmation={exitAccount}
                        />
                    </div>
                </div>
            )}

            {children}
        </section>
    );
}
