import { ReactNode } from 'react';

export interface ICard {
    title: string;
    to: string;
    withImage?: boolean;
    useTitleAsAttribute?: boolean;
    colorType: string;
    children: ReactNode;
}
