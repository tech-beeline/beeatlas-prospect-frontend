import React from 'react';
import { Icon, Icons } from '@beeline/lk-ui';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const IconStyled = styled(Icon)`
    color: ${({ type }) => !type && theme.colors.textInactive};
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
            icon = Icons.Reports;
            type = 'info';
            break;

        case stereotype === 'BUSINESS':
            icon = Icons.Reports;
            type = 'warning';
            break;

        default:
            icon = Icons.Folder;
    }

    // @ts-ignore
    return <IconStyled iconName={icon} type={type} />;
};
