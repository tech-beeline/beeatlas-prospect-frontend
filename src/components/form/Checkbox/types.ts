import { ReactNode } from 'react';

export interface ICheckbox {
    name: string;
    label: string | ReactNode;
    disabled?: boolean;
}
