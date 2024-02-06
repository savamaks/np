import { Open_Sans, Yanone_Kaffeesatz } from "next/font/google";
import "./globals.scss";
import cn from "classnames";
import { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";

const open: NextFont = Open_Sans({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "300", "500", "600", "700"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: {
        default: "Натяжные потолки",
        template: "Натяжные потолки | %s",
    },
    description:
        "Производим установку натяжных потолков в Петрозаводске, Кондопоге и соседних районах по выгодным ценам. Занимаемся производством потолочных конструкций из качественых матералов.",
    openGraph: {
        title: "",
        description: "",
        images: ["https://ptz-potolki.ru/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FIMG_20191223_204535.e4ffaa1d.jpg&w=1200&q=75"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <html lang="ru">
                <body className={cn(open.className)}>{children}</body>
            </html>
        </>
    );
}
