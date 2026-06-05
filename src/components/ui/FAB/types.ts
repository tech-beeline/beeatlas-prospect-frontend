import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type FABType = 'standard' | 'extended' | 'mini';

export interface FABProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: FABType;
    iconName: string;
    dataTestId?: string;
    children?: ReactNode;
}

export interface StyledFABProps {
    $type: FABType;
}
