import React, { FC } from 'react';
import { Badge } from '@beeline/design-system-react';

import { ITargetBadge } from './types';

export const TargetBadge: FC<ITargetBadge> = ({ target }) => {
    return (
        <Badge semantic={target ? 'magenta' : 'teal'} type="secondary">
            {target ? 'Целевой' : 'Фактический'}
        </Badge>
    );
};
