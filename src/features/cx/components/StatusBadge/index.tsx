import React, { FC } from 'react';

import { Badge } from 'components/ui';

import { statusIdToLabelTypeMap } from './const';
import { IStatusBadge } from './types';

export const StatusBadge: FC<IStatusBadge> = ({ status }) => {
    if (!status) return null;
    return (
        <Badge type="secondary" semantic={statusIdToLabelTypeMap[status.id]}>
            {status.name}
        </Badge>
    );
};
