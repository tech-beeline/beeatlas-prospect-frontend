import { ReactNode } from 'react';

export interface ICallField {
    label: string;
    value: ReactNode;
}

export interface ICallCard {
    title: string;
    fields: ICallField[];
    actions?: ReactNode;
    onExpandedChange?: (expanded: boolean) => void;
}
