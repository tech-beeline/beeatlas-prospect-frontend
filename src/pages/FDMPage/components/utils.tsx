import React from 'react';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import styled from '@emotion/styled';

import { Item, ItemTypes } from '../store/types';

const IconStyled = styled(Icon)`
    color: ${({ type }) => !type && 'var(--color-text-inactive)'};
`;

export const getItemIcon = (item: Item): JSX.Element => {
    if (item.domain && item.parentId === null) {
        return <IconStyled iconName={Icons.Folder} />;
    }

    if (item.domain && item.parentId === null) {
        return <IconStyled iconName={Icons.PagesMultipleEmpty} />;
    }

    if (item.type === ItemTypes.TECH) {
        return <IconStyled iconName={Icons.Capability} type="info" />;
    }

    return <IconStyled iconName={Icons.Capability} type="warning" />;
};
