import { HTMLAttributes } from 'react';

export interface ITitleBack extends HTMLAttributes<HTMLHeadingElement> {
    title: string;
    fontSize?: string;
}
