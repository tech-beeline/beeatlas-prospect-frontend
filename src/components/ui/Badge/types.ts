import type { HTMLAttributes, ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export type BadgeType = 'primary' | 'secondary' | 'tertiary';

export type BadgeSemantic =
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'neutral'
    | 'teal'
    | 'violet'
    | 'magenta'
    | 'aquamarine';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    children: ReactNode;
    type?: BadgeType;
    semantic?: BadgeSemantic;
    icon?: Icons;
    dot?: boolean;
    dataTestId?: string;
}

export interface StyledBadgeProps {
    $type: BadgeType;
    $semantic: BadgeSemantic;
    $hasDot: boolean;
    $hasIcon: boolean;
}
