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
