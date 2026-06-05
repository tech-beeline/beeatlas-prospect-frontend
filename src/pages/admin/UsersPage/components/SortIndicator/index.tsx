import React from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Icon } from 'components/ui';

export const SortIndicator = ({ order }: { order: 'asc' | 'desc' }) => {
    return <Icon iconName={order === 'asc' ? Icons.ArrowUp : Icons.ArrowDown} />;
};
