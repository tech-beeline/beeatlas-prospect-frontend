import React from 'react';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import styled from '@emotion/styled';

import { Item } from '../store/types';

const IconStyled = styled(Icon)`
    color: ${({ type }) => !type && 'var(--color-text-inactive)'};
`;

export const getItemIcon = (item: Item): JSX.Element => {
    let icon = Icons.Folder;
    let type = '';
    const aliasType = item.alias?.split('.')[0];

    if (aliasType === 'DMN') {
        icon = Icons.PagesMultipleEmpty;
    }

    if (item.stereotype === 'TECHNICAL') {
        icon = Icons.Capability;
        type = 'info';
    }

    if (item.stereotype === 'BUSINESS') {
        icon = Icons.Capability;
        type = 'warning';
    }

    // @ts-ignore
    return <IconStyled iconName={icon} type={type} />;
};
