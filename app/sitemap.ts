import { data } from "@/data";
import { url } from "inspector";
import { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const idCategory: MetadataRoute.Sitemap = data.map(({ id }) => ({
        url: `https://ptz-potolki.ru/services/${id}`,
    }));
    let idProduct: Array<string> = [];
    data.map((el) => {
        el.products.map(({ parentPath, id }) => {
            idProduct.push(`https://ptz-potolki.ru/services/${parentPath}/${id}`);
        });
    });

    const linkProduct: MetadataRoute.Sitemap = idProduct.map((el) => ({
        url: el,
    }));
    return [
        {
            url: "https://ptz-potolki.ru/",
        },
        {
            url: "https://ptz-potolki.ru/reviews",
        },
        {
            url: "https://ptz-potolki.ru/works",
        },
        ...idCategory,
        ...linkProduct,
    ];
};

export default sitemap;
