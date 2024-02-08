import { Open_Sans, Yanone_Kaffeesatz } from "next/font/google";
import "./globals.scss";
import cn from "classnames";
import { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import Head from "next/head";

const open: NextFont = Open_Sans({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "300", "500", "600", "700"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: {
        default: "Натяжные потолки | Петрозаводск, Кондопога",
        template: "Натяжные потолки | %s",
    },
    description:
        "Производим установку натяжных потолков в Петрозаводске, Кондопоге и соседних районах по выгодным ценам. Занимаемся производством потолочных конструкций из качественых матералов.",
    openGraph: {
        title: "",
        description: "",
        images: ["https://ptz-potolki.ru/_next/image?url=%2Filumination%2Flight%2F1.jpg&w=640&q=75"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <link rel="svg" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
            </Head>
            <html lang="ru">
                <body className={cn(open.className)}>{children}</body>
            </html>
        </>
    );
}
