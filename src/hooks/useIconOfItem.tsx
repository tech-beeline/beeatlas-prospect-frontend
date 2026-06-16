import React from 'react';
import styled from '@emotion/styled';

import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

export const IconStyled = styled(Icon)`
    color: ${({ type }) => !type && 'var(--color-text-inactive)'};
`;

export const useIconOfItem = (alias: string, stereotype = '') => {
    let icon = Icons.Folder;
    let type = '';
    const aliasType = alias?.split('.')[0];

    switch (true) {
        case aliasType === 'GRP':
            icon = Icons.Folder;
            break;

        case aliasType === 'DMN':
            icon = Icons.PagesMultipleEmpty;
            break;

        case stereotype === 'TECHNICAL':
            icon = Icons.Capability;
            type = 'info';
            break;

        case stereotype === 'BUSINESS':
            icon = Icons.Capability;
            type = 'warning';
            break;

        default:
            icon = Icons.Folder;
    }

    // @ts-ignore
    return <IconStyled iconName={icon} type={type} />;
};
