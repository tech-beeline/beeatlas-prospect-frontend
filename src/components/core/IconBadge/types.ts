import type { HTMLAttributes } from 'react';

import type { BadgeSemantic, BadgeType } from 'components/ui';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export interface IIconBadge extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    icon: Icons;
    semantic?: BadgeSemantic;
    type?: BadgeType;
    dataTestId?: string;
}
