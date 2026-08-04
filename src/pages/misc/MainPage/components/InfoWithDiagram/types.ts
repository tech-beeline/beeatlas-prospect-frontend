import { ReactNode } from 'react';

export interface IInfoWithDiagram {
    diagram: string;
    titleFirst: string;
    titleSecond: string;
    children?: ReactNode;
}
