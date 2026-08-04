import React, { FC } from 'react';

import { Icon } from 'components/ui';

import { ICON_BADGE_SEMANTIC_COLORS } from './const';
import { IIconBadge } from './types';
import * as S from './units';

export const IconBadge: FC<IIconBadge> = ({
    icon,
    semantic = 'info',
    type = 'secondary',
    className,
    dataTestId = 'IconBadge',
    ...props
}) => {
    const colors = ICON_BADGE_SEMANTIC_COLORS[type][semantic];

    return (
        <S.Root data-testid={dataTestId} className={className} {...colors} {...props}>
            <Icon iconName={icon} size="small" />
        </S.Root>
    );
};
