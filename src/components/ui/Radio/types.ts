import type { InputHTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string | ReactNode;
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    value?: string | number;
    name?: string;
    className?: string;
    dataTestId?: string;
}
