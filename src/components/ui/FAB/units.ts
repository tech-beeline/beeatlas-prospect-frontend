import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { FABType, StyledFABProps } from './types';

const baseStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    transition: all 125ms cubic-bezier(0, 0, 0.2, 1);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: var(--color-background-low);
    color: var(--color-text-active);
    border: 1px solid var(--color-border);
    box-shadow: 0 1px 4px rgba(9, 11, 22, 0.12);

    &:not(:disabled):hover {
        background-color: var(--color-background-medium);
    }

    &:not(:disabled):focus-visible {
        background-color: var(--color-background-high);
        border-color: var(--color-border-focused);
    }

    &:disabled {
        cursor: auto;
        opacity: 0.48;
        user-select: none;
        pointer-events: none;
    }
`;

const typeStyles: Record<FABType, ReturnType<typeof css>> = {
    standard: css`
        width: 56px;
        height: 56px;
        min-width: 56px;
        border-radius: 50%;
        padding: 16px;
    `,
    extended: css`
        height: 48px;
        border-radius: 24px;
        padding: 0 20px 0 12px;
        gap: 8px;
    `,
    mini: css`
        width: 40px;
        height: 40px;
        min-width: 40px;
        border-radius: 50%;
        padding: 8px;
    `,
};

export const StyledFAB = styled.button<StyledFABProps>`
    ${baseStyles}
    ${({ $type }) => typeStyles[$type]}
`;

export const IconWrapper = styled.span`
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: inherit;
`;

export const IconGlyph = styled.span`
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
    width: 24px;
    height: 24px;
    font-size: 24px;
    line-height: 24px;
    color: inherit;
`;

export const Label = styled.span`
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.2px;
    white-space: nowrap;
    color: inherit;
`;
