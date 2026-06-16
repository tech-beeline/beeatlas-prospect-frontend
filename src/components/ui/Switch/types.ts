import type { InputHTMLAttributes, ReactNode } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string | ReactNode;
    error?: boolean;
    className?: string;
    dataTestId?: string;
}
