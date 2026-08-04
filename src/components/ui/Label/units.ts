import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { LABEL_TYPE_COLORS } from './const';
import type { StyledLabelProps } from './types';

const baseStyles = css`
    display: inline-grid;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr;
    align-items: center;
    align-content: center;
    box-sizing: border-box;
    width: max-content;
    min-width: 24px;
    min-height: 24px;
    max-height: 24px;
    border-radius: 12px;
    border: 1px solid transparent;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    flex-shrink: 0;
`;

export const StyledLabel = styled.div<StyledLabelProps>`
    ${baseStyles}

    ${({ $type }) => {
        const colors = LABEL_TYPE_COLORS[$type];

        return css`
            background-color: ${colors.backgroundColor};
            border-color: ${colors.borderColor};
        `;
    }}

    ${({ $variant, $type }) => {
        const colors = LABEL_TYPE_COLORS[$type];

        if ($variant === 'contained') {
            return css`
                padding: 0 8px;
                border: none;
                color: var(--color-text-active-inverse);
            `;
        }

        if ($variant === 'icon') {
            return css`
                padding: 2px;
                min-width: 24px;
                min-height: 24px;
                justify-content: center;
                border: none;
                color: var(--color-text-active-inverse);
            `;
        }

        return css`
            padding: 0 7px;
            background-color: transparent;
            color: ${colors.color};
        `;
    }}

    ${({ $hasIcon, $hasTitle, $variant }) =>
        $hasIcon &&
        $hasTitle &&
        $variant !== 'icon' &&
        css`
            gap: 4px;
        `}
`;

export const IconGlyph = styled.span`
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
    width: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 20px;
    color: inherit;
`;

export const Title = styled.span`
    font-size: var(--font-size-subtitle3, 15px);
    line-height: var(--font-line-height-subtitle3, 20px);
    font-weight: var(--font-weight-subtitle3, 500);
    letter-spacing: 0.2px;
    color: inherit;
    white-space: nowrap;
`;
