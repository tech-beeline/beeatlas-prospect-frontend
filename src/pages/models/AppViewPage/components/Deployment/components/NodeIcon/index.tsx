import React from 'react';

import type { TechIcon } from '../../utils';

const DEFAULT_SIZE = 14;

/**
 * Иконка технологии: один путь из справочника (`utils/tech-icons.ts`), вписанный
 * в квадрат `size`×`size`. Масштаб считается от сетки самого знака (`icon.grid`):
 * у simple-icons это 24, но знаки из других наборов нарисованы в своих сетках.
 *
 * Подсказка нативная: иконка не должна прятать данные, а фирменный цвет — часть
 * знака, поэтому он берётся из справочника, а не из токенов темы. Исключение —
 * нейтральный глиф «технология не распознана»: ему отдан приглушённый цвет текста.
 */
export const NodeIcon = ({
    icon,
    x,
    y,
    size = DEFAULT_SIZE,
}: {
    icon: TechIcon;
    x: number;
    y: number;
    size?: number;
}) => (
    <path
        d={icon.path}
        transform={`translate(${x} ${y}) scale(${size / icon.grid})`}
        style={{ fill: icon.hex === 'currentColor' ? 'var(--color-text-inactive)' : icon.hex }}
    >
        <title>{icon.label}</title>
    </path>
);
