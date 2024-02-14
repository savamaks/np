"use server";

import { prisma } from "@/prisma/prisma";
import axios from "axios";
import { mkdir, writeFile } from "node:fs";
import fs from "node:fs";

interface ICategory {
    name: string;
    description: string;
    image: any;
}

export const setCategory = async ({ name, description, image }: ICategory) => {
    try {
        mkdir(`./public/${name}`, (error) => {
            if (error) throw error;
        });
        image.mv(`./public/${name}`);

        const newCategory = await prisma.category.create({
            data: {
                name: name,
                description: description,
                image: image,
            },
        });
        return newCategory;
    } catch (error) {
        console.log(error);
    }
};

export const setImages = async (image: FormData) => {
    try {
        const response = await fetch(`http://localhost:3030/api/upload`, {
            method: "POST",
            headers: {
                Accept: "application/json, application/xml, text/plain, text/html, *.*",
                "Content-Type": "multipart/form-data",
            },
            body: image,
        });
        const data = await response.json();
        console.log(data, "answerrrrrrrrrrrrrr");
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const downloadfiles = async () => {
    try {
        const response = await fetch(`http://localhost:3030/api/download`, {
            method: "GET",
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};
