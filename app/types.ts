import { MouseEvent } from "react";

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
        };
    };
}

export interface IRequest {
    attributes: {
        request: string;
        answer: string;
    };
}
