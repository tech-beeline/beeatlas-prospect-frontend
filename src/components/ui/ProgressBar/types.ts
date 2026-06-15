import type { MouseEvent, ReactNode, RefObject } from 'react';

import type { ProgressBarColors } from './const';

export type { ProgressBarColors };

export interface ProgressBarValue {
    value: number;
    label?: string;
    color: ProgressBarColors;
}

export type ProgressBarMouseHandler = (
    event: MouseEvent<SVGElement | HTMLDivElement>,
    item: ProgressBarValue,
    ref: RefObject<SVGElement | HTMLDivElement | null>,
) => void;

interface BaseProps {
    values: ProgressBarValue[];
    width?: number;
    height?: number;
    maxValue?: number;
    onMouseLeave?: ProgressBarMouseHandler;
    onMouseMove?: ProgressBarMouseHandler;
    className?: string;
}

export interface BarChartProps extends BaseProps {
    type: 'BarChart';
}

export interface DonutChartProps extends BaseProps {
    type: 'DonutChart';
    innerElement?: ReactNode;
    innerRadius?: number;
}

export type ProgressBarProps = BarChartProps | DonutChartProps;

export interface DonutSectionProps {
    item: ProgressBarValue;
    radius: number;
    startAngle: number;
    endAngle: number;
    onMouseMove?: ProgressBarMouseHandler;
    onMouseLeave?: ProgressBarMouseHandler;
}

export interface BarChartPieceProps {
    piece: ProgressBarValue;
    onMouseMove?: ProgressBarMouseHandler;
    onMouseLeave?: ProgressBarMouseHandler;
}
