import { RefObject, useEffect, useState } from 'react';

export const useResizeTick = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const [resizeTick, setResizeTick] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        if (!parent) return;

        let frameId: number | null = null;

        const observer = new ResizeObserver(() => {
            if (frameId !== null) return;

            frameId = requestAnimationFrame(() => {
                setResizeTick((tick) => tick + 1);
                frameId = null;
            });
        });

        observer.observe(parent);

        return () => {
            observer.disconnect();

            if (frameId !== null) {
                cancelAnimationFrame(frameId);
            }
        };
    }, []);

    return resizeTick;
};
