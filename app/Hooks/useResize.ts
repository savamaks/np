import { useState, useEffect } from "react";

const SCREEN_XL = 760;

export const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (event: any) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (width > 1440) {
        return {
            width: 1440,
            size: width >= SCREEN_XL,
        };
    } else {
        return {
            width,
            size: width >= SCREEN_XL,
        };
    }
};
