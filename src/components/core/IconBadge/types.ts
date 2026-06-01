import type { HTMLAttributes } from 'react';
import type { BadgeSemantic, BadgeType } from '@beeline/design-system-react';
import type { Icons } from '@beeline/design-tokens/js/iconfont/icons';

export interface IIconBadge extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    icon: Icons;
    semantic?: BadgeSemantic;
    type?: BadgeType;
    dataTestId?: string;
}
