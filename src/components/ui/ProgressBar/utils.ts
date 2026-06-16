import { ProgressBarColors } from './const';
import type { ProgressBarValue } from './types';

const CHART_COLOR_TOKENS: Record<ProgressBarColors, { default: string; active: string }> = {
    [ProgressBarColors.grey]: {
        default: 'var(--color-chart-grey, #d4d4d9)',
        active: 'var(--color-chart-grey-active, #b6b7bf)',
    },
    [ProgressBarColors.red]: {
        default: 'var(--color-chart-red, #ffb0b1)',
        active: 'var(--color-chart-red-active, #ff9193)',
    },
    [ProgressBarColors.orange]: {
        default: 'var(--color-chart-orange, #ffd086)',
        active: 'var(--color-chart-orange-active, #ffbd55)',
    },
    [ProgressBarColors.green]: {
        default: 'var(--color-chart-green, #a0dbae)',
        active: 'var(--color-chart-green-active, #78ce8e)',
    },
    [ProgressBarColors.blue]: {
        default: 'var(--color-chart-blue, #8dcaff)',
        active: 'var(--color-chart-blue-active, #5cb5ff)',
    },
    [ProgressBarColors.teal]: {
        default: 'var(--color-chart-teal, #80deef)',
        active: 'var(--color-chart-teal-active, #4dd0e7)',
    },
    [ProgressBarColors.magenta]: {
        default: 'var(--color-chart-magenta, #f2bceb)',
        active: 'var(--color-chart-magenta-active, #e98dde)',
    },
    [ProgressBarColors.purple]: {
        default: 'var(--color-chart-purple, #c89afa)',
        active: 'var(--color-chart-purple-active, #b16cf9)',
    },
    [ProgressBarColors.aquamarine]: {
        default: 'var(--color-chart-aquamarine, #8fd9cb)',
        active: 'var(--color-chart-aquamarine-active, #63ccba)',
    },
    [ProgressBarColors.yellow]: {
        default: 'var(--color-chart-yellow, #fff0a5)',
        active: 'var(--color-chart-yellow-active, #fee262)',
    },
    [ProgressBarColors.saphire]: {
        default: 'var(--color-chart-saphire, #a1a4e8)',
        active: 'var(--color-chart-saphire-active, #7e87df)',
    },
};

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
    const tokens = CHART_COLOR_TOKENS[color] ?? CHART_COLOR_TOKENS[ProgressBarColors.grey];

    return isHovered ? tokens.active : tokens.default;
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
