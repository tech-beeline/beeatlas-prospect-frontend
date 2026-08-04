import React from 'react';
import styled from '@emotion/styled';

import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { Item, ItemTypes } from '../store/types';

const IconStyled = styled(Icon)`
    color: ${({ type }) => !type && 'var(--color-text-inactive)'};
`;

export const getItemIcon = (item: Item): JSX.Element => {
    if (item.isDomain && item.parent === null) {
        return <IconStyled iconName={Icons.Folder} />;
    }

    if (item.isDomain && item.parent !== null) {
        return <IconStyled iconName={Icons.PagesMultipleEmpty} />;
    }

    if (item.type === ItemTypes.TECH) {
        return <IconStyled iconName={Icons.Capability} type="info" />;
    }

    return <IconStyled iconName={Icons.Capability} type="warning" />;
};
