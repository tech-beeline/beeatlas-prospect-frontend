import React, { FC } from 'react';
import { Label } from '@beeline/design-system-react';

import { ITargetLabel } from './types';

export const TargetLabel: FC<ITargetLabel> = ({ target }) => {
    return <Label title={target ? 'Целевой' : 'Фактический'} type={target ? 'purple' : 'teal'} />;
};
