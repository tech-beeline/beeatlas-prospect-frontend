import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledBadgeProps } from './types';

export const Root = styled.div`
    display: block;
    position: relative;
    width: fit-content;
`;

export const Badge = styled.span<StyledBadgeProps>`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: max-content;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    border-radius: 8px;
    line-height: 16px;
    font-size: 10px;
    top: -4px;
    left: calc(100% - 12px);
    box-sizing: border-box;
    padding: 0 4px;
    pointer-events: none;
    background: #fdd835;
    color: rgba(9, 11, 22, 0.94);
    letter-spacing: 1.2px;
    font-weight: 700;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

    ${({ $size }) =>
        $size === 'medium' &&
        css`
            min-width: 20px;
            min-height: 20px;
            border-radius: 10px;
        `}

    ${({ $error }) =>
        $error &&
        css`
            background: var(--color-status-error);
            color: var(--color-text-active-inverse);
        `}

    ${({ $standalone }) =>
        $standalone &&
        css`
            position: static;
        `}
`;

export const BadgeExclamation = styled(Badge)`
    letter-spacing: 0;
`;
