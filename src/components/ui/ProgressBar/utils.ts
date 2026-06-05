import * as colors from '@beeline/design-tokens/js/tokens/globals/colors';

import type { ProgressBarColors } from './const';
import type { ProgressBarValue } from './types';

type ChartColorToken = keyof typeof colors;

export const classNames = (
    ...values: Array<string | false | null | undefined | Record<string, boolean>>
): string => {
    const classes: string[] = [];

    values.forEach((value) => {
        if (!value) {
            return;
        }

        if (typeof value === 'string') {
            classes.push(value);
            return;
        }

        Object.entries(value).forEach(([className, isActive]) => {
            if (isActive) {
                classes.push(className);
            }
        });
    });

    return classes.join(' ');
};

export const normalizeValues = (
    values: ProgressBarValue[],
    maxValue: number,
): ProgressBarValue[] => {
    if (maxValue === 100) {
        return values;
    }

    return values.map((item) => ({
        ...item,
        value: (item.value / maxValue) * 100,
    }));
};

export const getChartColor = (color: ProgressBarColors, isHovered: boolean): string => {
    const tokenName = `colorChart${color}${isHovered ? 'Active' : ''}` as ChartColorToken;
    const tokenValue = colors[tokenName] ?? colors.colorChartGrey;

    return String(tokenValue);
};

export const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
): { x: number; y: number } => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};

export const buildDonutSectionPath = (
    radius: number,
    startAngle: number,
    endAngle: number,
): string => {
    const angleDiff = endAngle - startAngle;
    const isFullCircle = Math.abs(angleDiff) >= 359.99;
    const largeArcFlag = angleDiff <= 180 ? '0' : '1';
    const start = polarToCartesian(radius, radius, radius, endAngle);
    const end = polarToCartesian(radius, radius, radius, startAngle);

    if (isFullCircle) {
        return [
            `M ${radius} ${radius}`,
            `L ${radius} 0`,
            `A ${radius} ${radius} 0 1 1 ${radius - 0.01} 0`,
            'Z',
        ].join(' ');
    }

    return [
        `M ${radius} ${radius}`,
        `L ${start.x} ${start.y}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
        'Z',
    ].join(' ');
};

export const getProgressValueSum = (values: ProgressBarValue[]): number =>
    values.reduce((sum, item) => sum + item.value, 0);
