import React, { FC } from 'react';

import { Badge } from 'components/ui';

import { ITargetBadge } from './types';

export const TargetBadge: FC<ITargetBadge> = ({ target }) => {
    return (
        <Badge semantic={target ? 'magenta' : 'teal'} type="secondary">
            {target ? 'Целевой' : 'Фактический'}
        </Badge>
    );
};
