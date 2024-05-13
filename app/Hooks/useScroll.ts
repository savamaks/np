import { useState, useEffect } from "react";

export function useScroll() {
    const [Y, setY] = useState<null | number>(null);

    useEffect(() => {
        const handleScroll = () => {
            setY(window.scrollY);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return Y;
}
