import type { HTMLAttributes } from 'react';

export type DividerType = 'horizontal' | 'vertical';

export interface DividerProps extends HTMLAttributes<HTMLHRElement | HTMLDivElement> {
    type?: DividerType;
    isDecorative?: boolean;
}

export interface StyledDividerProps {
    $type: DividerType;
}
