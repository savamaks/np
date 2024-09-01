import { MouseEvent } from "react";

export interface INewData {
    name?: string;
    title?: string;
    description?: string;
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
    attributes: {
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
    };
}
export interface IWorkPhoto {
    id: string;
    attributes: {
        title: string;
        images: {
            data: Array<IDataImage>;
        };
    };
}

export interface IProduct {
    id: string;
    attributes: {
        title: string;
        name: string;
        description: string;
        video: string;
        image: {
            data: {
                attributes: {
                    formats: {
                        small?: {
                            url?: string;
                        };
                        medium?: {
                            url?: string;
                        };
                    };
                    url: string;
                };
            };
        };
        images: {
            data: Array<IDataImage>;
        };
        image: IImage;
        category: {
            data: ICategory;
        };
        publishedAt: null | string;
        products: {
            data: Array<IProduct>;
        };
    };
}

export interface IImage {
    data: {
        id: string;
        attributes: {
            formats: {
                small: {
                    url: string;
                };
                medium: {
                    url: string;
                };
            };
            url: string;
        };
    };
}
export interface ICategory {
    id: string;
    attributes: {
        title: string;
        name: string;
        description: string;
        products: {
            data: Array<IProduct>;
        };
        images?: {
            data: Array<IDataImage>;
        };
        video?: string;
        category?: {
            data: ICategory;
        };
        image: IImage;
        publishedAt: string | null;
    };
}

export interface IRequest {
    id: string;
    attributes: {
        request: string;
        answer: string;
        publishedAt: null | string;
    };
}
export interface INewDataRequest {
    request: string;
    answer: string;
}
