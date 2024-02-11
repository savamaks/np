import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin"],
            },
        ],
        sitemap: "https://ptz-potolki.ru/sitemap.xml",
    };
};

export default robots;
