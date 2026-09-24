/**
 * Панорамирование и зум диаграммы без библиотек — перенесено из прототипа
 * (`experiments/beeline-diagrams/src/hooks/usePanZoom.ts`). Пределы те же, что
 * у колеса в движке диаграмм (`useCanvasWheel.ts`: шаг 1.1 и clamp [0.35, 2.4]).
 */

import { useCallback, useEffect, useRef, useState } from 'react';

import { VIEWPORT } from '../const';
import { type IViewport, fitViewport, zoomAt } from '../utils';

export interface IUsePanZoomResult {
    viewport: IViewport;
    containerRef: React.RefObject<HTMLDivElement>;
    bind: {
        onMouseDown: (event: React.MouseEvent) => void;
        onMouseMove: (event: React.MouseEvent) => void;
        onMouseUp: () => void;
        onMouseLeave: () => void;
    };
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
    /**
     * Был ли текущий жест перетаскиванием, а не кликом. Нужно там, где на клик
     * по полотну навешено действие: `dragging` для этого не годится — он истинен
     * на всём жесте, включая обычный клик, и сбрасывается на `mouseup`, то есть
     * раньше `click`.
     */
    wasDrag: () => boolean;
    /** Вписать мир в окно — аналог `fitToScreen` из движка. */
    fitToScreen: (worldWidth: number, worldHeight: number, pad: number) => void;
    dragging: boolean;
}

export const usePanZoom = (): IUsePanZoomResult => {
    const [viewport, setViewport] = useState<IViewport>({ x: 0, y: 0, zoom: 1 });
    const [dragging, setDragging] = useState(false);
    const dragRef = useRef<{
        startX: number;
        startY: number;
        originX: number;
        originY: number;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Сбрасывается только в начале жеста: mouseup приходит раньше click,
    // и сброс в конце жеста стёр бы признак до того, как его прочитает обработчик клика.
    const movedRef = useRef(false);

    const onMouseDown = useCallback(
        (event: React.MouseEvent) => {
            dragRef.current = {
                startX: event.clientX,
                startY: event.clientY,
                originX: viewport.x,
                originY: viewport.y,
            };
            movedRef.current = false;
            setDragging(true);
        },
        [viewport.x, viewport.y],
    );

    const onMouseMove = useCallback((event: React.MouseEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        if (
            !movedRef.current &&
            Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > VIEWPORT.dragSlop
        ) {
            movedRef.current = true;
        }
        setViewport((current) => ({
            ...current,
            x: drag.originX + (event.clientX - drag.startX),
            y: drag.originY + (event.clientY - drag.startY),
        }));
    }, []);

    const endDrag = useCallback(() => {
        dragRef.current = null;
        setDragging(false);
    }, []);

    const zoomBy = useCallback((factor: number, anchor?: { x: number; y: number }) => {
        setViewport((current) => {
            const next = Math.min(
                VIEWPORT.maxZoom,
                Math.max(VIEWPORT.minZoom, current.zoom * factor),
            );
            if (Math.abs(next - current.zoom) < 1e-4) return current;
            return zoomAt(current, next, anchor ?? { x: 0, y: 0 });
        });
    }, []);

    const zoomIn = useCallback(() => zoomBy(VIEWPORT.buttonStep), [zoomBy]);
    const zoomOut = useCallback(() => zoomBy(1 / VIEWPORT.buttonStep), [zoomBy]);
    const reset = useCallback(() => setViewport({ x: 0, y: 0, zoom: 1 }), []);

    /**
     * `pad` — отступ полотна, который канвас добавляет внутренним `translate`:
     * без его учёта содержимое смещается ровно на `pad * zoom`.
     */
    const fitToScreen = useCallback((worldWidth: number, worldHeight: number, pad: number) => {
        const el = containerRef.current;
        if (!el || worldWidth <= 0 || worldHeight <= 0) return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        setViewport(
            fitViewport({ width: rect.width, height: rect.height }, worldWidth, worldHeight, pad),
        );
    }, []);

    // Нативный слушатель нужен, чтобы вызвать preventDefault: React-обработчик wheel пассивен.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const rect = el.getBoundingClientRect();
            zoomBy(event.deltaY < 0 ? VIEWPORT.wheelStep : 1 / VIEWPORT.wheelStep, {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            });
        };
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [zoomBy]);

    const wasDrag = useCallback(() => movedRef.current, []);

    return {
        viewport,
        containerRef,
        bind: { onMouseDown, onMouseMove, onMouseUp: endDrag, onMouseLeave: endDrag },
        zoomIn,
        zoomOut,
        reset,
        wasDrag,
        fitToScreen,
        dragging,
    };
};
