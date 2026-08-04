import { useCallback, useRef } from 'react';

import { UseCanvasViewportParams } from './types';
import { useCanvasWheel } from './useCanvasWheel';

export function useCanvasViewport(params: UseCanvasViewportParams) {
    const { canvasRef, drawRef, minZoom = 0.35, maxZoom = 2.4, step = 1.12 } = params;

    const panRef = useRef({ x: 0, y: 0 });
    const zoomRef = useRef(1);

    useCanvasWheel({
        canvasRef,
        panRef,
        zoomRef,
        draw: () => drawRef.current(),
    });

    const zoomIn = useCallback(() => {
        zoomRef.current = Math.min(maxZoom, zoomRef.current * step);
        drawRef.current();
    }, [maxZoom, step, drawRef]);

    const zoomOut = useCallback(() => {
        zoomRef.current = Math.max(minZoom, zoomRef.current / step);
        drawRef.current();
    }, [minZoom, step, drawRef]);

    const resetZoom = useCallback(
        (options?: { pan?: { x: number; y: number } | null }) => {
            zoomRef.current = 1;
            if (options?.pan) {
                panRef.current = options.pan;
            }
            drawRef.current();
        },
        [drawRef],
    );

    return { panRef, zoomRef, zoomIn, zoomOut, resetZoom };
}
