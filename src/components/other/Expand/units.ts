import { css } from '@emotion/react';
import styled from '@emotion/styled';

import * as T from './types';

export const ExpandWrapper = styled.div<T.IExpandWrapper>`
    height: ${({ height, isOpen, isHeightCalc }) =>
        isHeightCalc ? (isOpen ? `${height}px` : '0px') : 'auto'};
    width: 100%;

    overflow: ${({ isHidden }) => isHidden && 'hidden'};

    cursor: ${({ isClickable }) => isClickable && 'pointer'};

    transition: height ${({ transition }) => `${transition}s`} ease-out;
`;

export const ChildrenContainer = styled.div<{
    display?: string;
    justifyContent?: string;
    alignItems?: string;
}>`
    display: ${({ display }) => display || 'block'};

    ${({ display, justifyContent, alignItems }) =>
        display === 'flex' &&
        css`
            justify-content: ${justifyContent || 'flex-start'};
            align-items: ${alignItems || 'stretch'};
        `}
`;
