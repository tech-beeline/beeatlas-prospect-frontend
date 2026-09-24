import React, { useEffect, useId } from 'react';

import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { GRID_CELL, TOOLBAR, VIEWPORT } from '../../const';
import { usePanZoom } from '../../hooks';
import type { CardLinkRole, IDeploymentBox, IDeploymentLayout } from '../../types';
import { DeploymentFrame } from '../DeploymentFrame';

import * as S from './units';

interface IDeploymentCanvasProps {
    layout: IDeploymentLayout;
    selected: string | null;
    dimmed: ReadonlySet<string>;
    roles: ReadonlyMap<string, CardLinkRole>;
    shapeColor?: string;
    onSelect: (id: string) => void;
    onToggle: (id: string) => void;
    onClearSelection: () => void;
    /** Выгрузка диаграммы в SVG: строка собирается из раскладки, файл пишет вкладка. */
    onExportSvg: () => void;
}

/**
 * Полотно диаграммы развёртывания — перенесено из прототипа
 * (`experiments/beeline-diagrams/src/components/DiagramFrame.tsx`).
 *
 * Мир рисуется в своих координатах, поверх него — сдвиг и масштаб вьюпорта, поэтому
 * зум и панорамирование не пересчитывают раскладку: позиции рамок от них не зависят.
 * Вписывание — на монтировании, при смене габаритов мира и на ресайз контейнера
 * (`ResizeObserver`): после схлопывания узла мир меняется, и диаграмма вписывается
 * заново — так же, как в прототипе.
 */
export const DeploymentCanvas = ({
    layout,
    selected,
    dimmed,
    roles,
    shapeColor,
    onSelect,
    onToggle,
    onClearSelection,
    onExportSvg,
}: IDeploymentCanvasProps) => {
    const { viewport, containerRef, bind, zoomIn, zoomOut, reset, fitToScreen, wasDrag } =
        usePanZoom();
    const gridId = `deployment-grid-${useId().replace(/:/g, '')}`;
    const shadowId = `deployment-card-shadow-${useId().replace(/:/g, '')}`;

    const { width, height } = layout;

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const apply = () => fitToScreen(width, height, VIEWPORT.pad);
        apply();

        if (typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(apply);
        observer.observe(el);
        return () => observer.disconnect();
    }, [width, height, fitToScreen, containerRef]);

    return (
        <S.Root>
            <S.Toolbar>
                <Button
                    size="small"
                    onClick={zoomOut}
                    startIcon={<Icon iconName={Icons.ZoomOut} />}
                />
                <S.ZoomValue>{Math.round(viewport.zoom * 100)}%</S.ZoomValue>
                <Button
                    size="small"
                    onClick={zoomIn}
                    startIcon={<Icon iconName={Icons.ZoomIn} />}
                />
                <Button
                    size="small"
                    onClick={() => fitToScreen(width, height, VIEWPORT.pad)}
                    startIcon={<Icon iconName={Icons.Collapse} />}
                >
                    {TOOLBAR.fit}
                </Button>
                <Button size="small" onClick={reset} startIcon={<Icon iconName={Icons.Refresh} />}>
                    {TOOLBAR.reset}
                </Button>
                {/*
                    Выгрузка стоит рядом со «Сбросом»: обе кнопки — про полотно целиком,
                    а не про масштаб, и от зума с панорамой файл не зависит.
                */}
                <Button
                    size="small"
                    onClick={onExportSvg}
                    startIcon={<Icon iconName={Icons.Download} />}
                >
                    {TOOLBAR.exportSvg}
                </Button>
                {width > 0 && (
                    <S.Dimmensions>
                        {Math.round(width)}×{Math.round(height)}
                    </S.Dimmensions>
                )}
            </S.Toolbar>

            <S.Canvas ref={containerRef} {...bind}>
                <S.CanvasSvg role="img" aria-label="Диаграмма развёртывания">
                    <defs>
                        <pattern
                            id={gridId}
                            width={GRID_CELL}
                            height={GRID_CELL}
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d={`M ${GRID_CELL} 0 H 0 V ${GRID_CELL}`}
                                fill="none"
                                style={{ stroke: 'var(--color-divider)' }}
                                strokeWidth={1}
                            />
                        </pattern>
                        {/*
                            Тень карточек экземпляров — одна на всё полотно, а не фильтр
                            на каждую карточку, как в прототипе
                            (`DiagramFrame.tsx`): у крупной диаграммы карточек десятки,
                            и отдельные фильтры стоили бы заметно дороже.
                        */}
                        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="150%">
                            <feDropShadow
                                dx="0"
                                dy="1"
                                stdDeviation="2"
                                floodColor="#0F172A"
                                floodOpacity="0.1"
                            />
                        </filter>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill={`url(#${gridId})`}
                        // Клик по пустому полотну снимает выделение — но только если
                        // это был клик, а не перетаскивание.
                        onClick={() => {
                            if (!wasDrag()) onClearSelection();
                        }}
                    />
                    <g transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.zoom})`}>
                        <g transform={`translate(${VIEWPORT.pad} ${VIEWPORT.pad})`}>
                            {layout.boxes.map((box: IDeploymentBox) => (
                                <DeploymentFrame
                                    key={box.id}
                                    box={box}
                                    selected={selected}
                                    dimmed={dimmed}
                                    roles={roles}
                                    shapeColor={shapeColor}
                                    shadowId={shadowId}
                                    onSelect={onSelect}
                                    onToggle={onToggle}
                                />
                            ))}
                        </g>
                    </g>
                </S.CanvasSvg>
                <S.Hint>{TOOLBAR.hint}</S.Hint>
            </S.Canvas>
        </S.Root>
    );
};
