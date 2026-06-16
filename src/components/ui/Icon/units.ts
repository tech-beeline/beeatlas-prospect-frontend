import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { ColorTypes } from '../types';

import type { StyledIconProps } from './types';

const containedColorStyles: Record<ColorTypes, ReturnType<typeof css>> = {
    grey: css`
        color: var(--color-status-neutral);
        background: var(--color-status-neutral-background);
    `,
    red: css`
        color: var(--color-status-error);
        background: var(--color-status-error-background);
    `,
    orange: css`
        color: var(--color-status-warning);
        background: var(--color-status-warning-background);
    `,
    green: css`
        color: var(--color-status-success);
        background: var(--color-status-success-background);
    `,
    blue: css`
        color: var(--color-status-info);
        background: var(--color-status-info-background);
    `,
    purple: css`
        color: var(--color-accent-purple);
        background: var(--color-accent-purple-background);
    `,
    teal: css`
        color: var(--color-accent-teal);
        background: var(--color-accent-teal-background);
    `,
    magenta: css`
        color: var(--color-accent-magenta);
        background: var(--color-accent-magenta-background);
    `,
};

const sizedColorStyles: Record<ColorTypes, ReturnType<typeof css>> = {
    grey: css`
        color: var(--color-status-neutral);
    `,
    red: css`
        color: var(--color-status-error);
    `,
    orange: css`
        color: var(--color-status-warning);
    `,
    green: css`
        color: var(--color-status-success);
    `,
    blue: css`
        color: var(--color-status-info);
    `,
    purple: css`
        color: var(--color-accent-purple);
    `,
    teal: css`
        color: var(--color-accent-teal);
    `,
    magenta: css`
        color: var(--color-accent-magenta);
    `,
};

const sizeStyles = {
    small: css`
        width: 18px;
        height: 18px;
        font-size: 18px;
        line-height: 18px;
    `,
    medium: css`
        width: 20px;
        height: 20px;
        font-size: 20px;
        line-height: 20px;
    `,
    large: css`
        width: 24px;
        height: 24px;
        font-size: 24px;
        line-height: 24px;
    `,
};

export const StyledIcon = styled.span<StyledIconProps>`
    background-repeat: no-repeat;
    display: inline-block;
    color: var(--color-text-active);
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';

    ${({ $isContained }) =>
        $isContained &&
        css`
            max-width: 40px;
            max-height: 40px;
            padding: 8px;
            border-radius: 12px;
        `}

    ${({ $isContained, $color }) => $isContained && containedColorStyles[$color]}
    ${({ $isContained, $size }) => !$isContained && $size && sizeStyles[$size]}
    ${({ $isContained, $color }) => !$isContained && sizedColorStyles[$color]}
`;
