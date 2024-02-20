import  { MouseEvent } from "react";


export interface IImages {
    src: string;
    width: number;
    height: number;
}
export interface ITarget extends EventTarget {
    id: string;
}
export interface IMouseEvent extends MouseEvent<HTMLImageElement> {
    target: ITarget;
}
export interface IDataImage {
    id: string;
    attributes: {
        name: string;
        url: string;
    };
}

export interface IProduct {
    id: string;
    attributes: {
        title: string;
        name: string;
        description: string;
        images: {
            data: Array<IDataImage>;
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
        image: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
    };
}

export interface IPhoto {
    name: string;
    size: number;
    url: string;
}
export interface IWorkPhoto {
    id: string;
    attributes: {
        title: string;
        images: {
            data: Array<IPhoto>;
        };
    };
}