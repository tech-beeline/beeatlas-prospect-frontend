import type { CSSProperties, HTMLAttributes } from 'react';

export type ProgressShape = 'linear' | 'circle' | 'animated';
export type ProgressSize = 'standart' | 'mini' | number;
export type LinearProgressType = 'solo' | 'container';

export interface ProgressProps extends HTMLAttributes<HTMLElement> {
    value?: number;
    shape?: ProgressShape;
    cycled?: boolean;
    strokeWidth?: number;
    size?: ProgressSize;
    type?: LinearProgressType;
    className?: string;
    style?: CSSProperties;
}

export interface LinearProgressProps extends Omit<ProgressProps, 'shape' | 'size'> {
    type?: LinearProgressType;
}

export interface CircleProgressProps extends Omit<ProgressProps, 'shape' | 'type'> {
    size?: ProgressSize;
}

export type AnimatedProgressProps = Omit<
    ProgressProps,
    'shape' | 'value' | 'cycled' | 'size' | 'type' | 'strokeWidth'
>;

export interface AnimatedPairStyle {
    animationDelay: number;
    opacity: number;
    zIndex: number;
}
