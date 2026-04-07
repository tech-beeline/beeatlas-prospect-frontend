import { RefObject, useEffect, useState } from 'react';

export const useResizeTick = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const [resizeTick, setResizeTick] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        if (!parent) return;
        const observer = new ResizeObserver(() => setResizeTick((tick) => tick + 1));
        observer.observe(parent);
        return () => observer.disconnect();
    }, [canvasRef]);

    return resizeTick;
};
