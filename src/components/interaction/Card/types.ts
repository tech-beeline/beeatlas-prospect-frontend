import { ReactNode } from 'react';

export enum CardVariant {
    TEAL = 'TEAL',
    MAGENTA = 'MAGENTA',
    LEMON = 'LEMON',
    AQUAMARINE = 'AQUAMARINE',
    PURPLE = 'PURPLE',
    INFO = 'INFO',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    SUCCESS = 'SUCCESS',
    NEUTRAL = 'NEUTRAL',
}

export interface ICard {
    title: string;
    to: string;
    variant: CardVariant;
    children: ReactNode;
    withImage?: boolean;
    useTitleAsAttribute?: boolean;
}
