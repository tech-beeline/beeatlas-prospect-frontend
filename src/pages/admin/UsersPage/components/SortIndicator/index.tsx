import React from 'react';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

export const SortIndicator = ({ order }: { order: 'asc' | 'desc' }) => {
    return <Icon iconName={order === 'asc' ? Icons.ArrowUp : Icons.ArrowDown} />;
};
