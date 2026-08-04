import { useEffect } from 'react';

import { UseCanvasWheelParams } from './types';

export const useCanvasWheel = ({ canvasRef, panRef, zoomRef, draw }: UseCanvasWheelParams) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const sx = event.clientX - rect.left;
            const sy = event.clientY - rect.top;
            const prevZoom = zoomRef.current;
            const zoomDelta = event.deltaY < 0 ? 1.1 : 1 / 1.1;
            const nextZoom = Math.min(2.4, Math.max(0.35, prevZoom * zoomDelta));
            if (Math.abs(nextZoom - prevZoom) < 0.0001) return;

            const wx = (sx - panRef.current.x) / prevZoom;
            const wy = (sy - panRef.current.y) / prevZoom;
            zoomRef.current = nextZoom;
            panRef.current.x = sx - wx * nextZoom;
            panRef.current.y = sy - wy * nextZoom;
            draw();
        };

        canvas.addEventListener('wheel', onWheel, { passive: false });
        return () => canvas.removeEventListener('wheel', onWheel);
    }, [canvasRef, draw, panRef, zoomRef]);
};
