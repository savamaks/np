import { MetadataRoute } from "next";
import { ICategory, IProduct } from "./types";

const getData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/categories?populate=*`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
            },
        });
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const data = await getData();
    const categories: Array<ICategory> = data.data;

    const idCategory: MetadataRoute.Sitemap = categories.map(({ title }) => ({
        url: `https://ptz-potolki.ru/services/${title}`,
    }));

    let idProduct: Array<string> = [];

    categories.map((el) => {
        if (el.products === undefined) return;
        const products = el.products;

        products.map(({ title }) => {
            idProduct.push(`https://ptz-potolki.ru/services/${el.title}/${title}`);
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
