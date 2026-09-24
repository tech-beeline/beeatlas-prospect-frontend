/**
 * Вьюпорт диаграммы: вписывание мира в контейнер и панорамирование — перенесено
 * из прототипа (`experiments/beeline-diagrams/src/lib/viewport.ts`, `hooks/usePanZoom.ts`).
 *
 * Мир (раскладка) считается в своих координатах, а вьюпорт — это сдвиг и масштаб
 * поверх него. Позиции узлов от вьюпорта не зависят: выделение и зум меняют только
 * `translate`/`scale`, поэтому раскладка не пересчитывается ни на зум, ни на ресайз.
 */

import { VIEWPORT } from '../const';

export interface IViewport {
    x: number;
    y: number;
    zoom: number;
}

export interface ISize {
    width: number;
    height: number;
}

/** Зум и сдвиг, при которых мир целиком помещается в контейнер. */
export const fitViewport = (
    size: ISize,
    worldWidth: number,
    worldHeight: number,
    pad: number,
): IViewport => {
    const totalW = worldWidth + pad * 2;
    const totalH = worldHeight + pad * 2;
    const zoom = Math.min(
        VIEWPORT.maxZoom,
        Math.max(
            VIEWPORT.minZoom,
            Math.min(
                (size.width * VIEWPORT.fitCoverage) / totalW,
                (size.height * VIEWPORT.fitCoverage) / totalH,
                VIEWPORT.maxFitZoom,
            ),
        ),
    );
    return {
        zoom,
        x: (size.width - totalW * zoom) / 2,
        y: (size.height - totalH * zoom) / 2,
    };
};

/** Зум с якорем: точка мира под курсором остаётся под курсором. */
export const zoomAt = (
    viewport: IViewport,
    nextZoomRaw: number,
    anchor: { x: number; y: number },
): IViewport => {
    const zoom = Math.min(VIEWPORT.maxZoom, Math.max(VIEWPORT.minZoom, nextZoomRaw));
    const worldX = (anchor.x - viewport.x) / viewport.zoom;
    const worldY = (anchor.y - viewport.y) / viewport.zoom;
    return { zoom, x: anchor.x - worldX * zoom, y: anchor.y - worldY * zoom };
};
