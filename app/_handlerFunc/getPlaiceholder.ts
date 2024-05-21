"use server"

import { getPlaiceholder } from "plaiceholder";

export const plaiceholder = async (src: string) => {
    try {
        const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));

        const { color } = await getPlaiceholder(buffer);

        console.log(color);
    } catch (err) {
        err;
    }
};
