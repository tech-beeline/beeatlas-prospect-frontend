import type { HTMLAttributes } from 'react';
import type { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import type { BadgeSemantic, BadgeType } from 'components/ui';

export interface IIconBadge extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    icon: Icons;
    semantic?: BadgeSemantic;
    type?: BadgeType;
    dataTestId?: string;
}
