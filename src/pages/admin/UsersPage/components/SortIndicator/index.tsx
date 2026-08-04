import React from 'react';

import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

export const SortIndicator = ({ order }: { order: 'asc' | 'desc' }) => {
    return <Icon iconName={order === 'asc' ? Icons.ArrowUp : Icons.ArrowDown} />;
};
