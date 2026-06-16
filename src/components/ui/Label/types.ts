import type { HTMLAttributes } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export type LabelType =
    | 'default'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'purple'
    | 'teal'
    | 'magenta';

export type LabelVariant = 'contained' | 'outline' | 'icon';

export interface LabelProps extends HTMLAttributes<HTMLDivElement> {
    type?: LabelType;
    variant?: LabelVariant;
    /** @deprecated use `variant` instead */
    assign?: LabelVariant;
    title?: string;
    iconName?: Icons;
    dataTestId?: string;
}

export interface StyledLabelProps {
    $type: LabelType;
    $variant: LabelVariant;
    $hasIcon: boolean;
    $hasTitle: boolean;
}
