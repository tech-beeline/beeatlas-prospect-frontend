import React, { FC } from 'react';
import { Label } from '@beeline/design-system-react';

import { statusIdToLabelTypeMap } from './const';
import { IStatusLabel } from './types';

export const StatusLabel: FC<IStatusLabel> = ({ status }) => {
    return <Label title={status.name} type={statusIdToLabelTypeMap[status.id] ?? 'default'} />;
};
