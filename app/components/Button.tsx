"use client";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, MouseEvent } from "react";

interface IButton {
    children: ReactNode;
    path?: string;
    className?: string;
    onClick?: () => void;
    
}

const Button: FC<IButton> = ({ children, className, path }) => {
    const router = useRouter();

    const click = (e: MouseEvent<HTMLButtonElement>) => {
        console.log(path);
        router.push(`/services/${path}`);
    };
    return (
        <button onClick={click} className={className}>
            {children}
        </button>
    );
};

export default Button;
