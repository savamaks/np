import React, {  useEffect, useRef } from "react";

const Canvas = (props: any) => {
    const refCanvas = useRef();
    useEffect(() => {
        const canvas: any = refCanvas.current;
        if (canvas !== undefined) {
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "grey";
            ctx.fillRect(10, 10, 100, 100);
        }
    }, []);
    return <canvas ref={refCanvas} {...props} />;
};

export default Canvas;
