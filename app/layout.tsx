import { Open_Sans } from "next/font/google";
import "./globals.scss";
import cn from "classnames";
import { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import Head from "next/head";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import { StoreWrapper } from "./components/store/provider";

const open: NextFont = Open_Sans({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "300", "500", "600", "700"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_SRC_STRAPI}`),
    title: {
        default: "Натяжные потолки | Петрозаводск, Кондопога",
        template: "Натяжные потолки | %s",
    },
    description:
        "Производим установку натяжных потолков в Петрозаводске, Кондопоге и соседних районах по выгодным ценам. Занимаемся производством потолочных конструкций из качественых матералов.",
    openGraph: {
        title: "",
        description: "",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SRC_STRAPI}/uploads/light_2_c4fedcaf67.jpg`,
                width: 800,
                height: 600,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <link rel="svg" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
                <link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />
            </Head>
            <html lang="ru">
                <body className={cn(open.className)}>
                    <StoreWrapper>
                        <Header />
                        {children}
                        <Footer />
                    </StoreWrapper>
                </body>
            </html>
        </>
    );
}
