import { MouseEvent } from "react";

export interface INewData {
    name?: string;
    title?: string;
    description?: string;
    video?: string;
    category?: {
        connect?: [
            {
                id: string | null;
                position?: {
                    start: boolean;
                };
            }
        ];
        disconnect?: [
            {
                id: string | null;
            }
        ];
    };
    products?: {
        connect: Array<string>;
        disconnect?: Array<string>;
    };
    publishedAt?: null | string;
}
export interface IImages {
    src: string;
    width: number;
    height: number;
}
export interface ITarget extends EventTarget {
    id: string;
    dataset: {
        src: string;
        index: string;
    };
}

export interface IMouseEvent extends MouseEvent<HTMLImageElement> {
    target: ITarget;
}

export interface IDataImage {
    id: string;

    formats: {
        small: {
            url: string;
        };
        medium: {
            url: string;
        };
        large?: {
            url: string;
        };
    };
    name: string;
    url: string;
}
export interface IWorkPhoto {
    id: string;

    title: string;
    images: Array<IDataImage>;
}

export interface IProduct {
    id: string;

    title: string;
    name: string;
    description: string;
    video: string;

    images: Array<IDataImage>;

    image: IImage;
    category: ICategory;

    publishedAt: null | string;
    products: Array<IProduct>;
}

export interface IImage {
    id: string;

    formats: {
        small: {
            url: string;
        };
        medium: {
            url: string;
        };
    };
    url: string;
}
export interface ICategory {
    id: string;
    title: string;
    name: string;
    description: string;
    products: Array<IProduct>;

    images?: Array<IDataImage>;

    video?: string;
    category?: ICategory;
    image: IImage;
    publishedAt: string | null;
}

export interface IRequest {
    id: string;
    request: string;
    answer: string;
    publishedAt: null | string;
}
export interface INewDataRequest {
    request: string;
    answer: string;
}

export interface IDataRewive {
    id: number;
    name: string;
    text: string;
    date: string;
    rating: string;
    createdAt: string;
    published: boolean;
}
