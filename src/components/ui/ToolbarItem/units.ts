import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ICON_COLOR_VARIABLES } from './const';
import type { StyledIconGlyphProps, StyledToolbarItemProps } from './types';

const sizeStyles = {
    medium: css`
        height: 28px;
    `,
    large: css`
        height: 40px;
    `,
};

export const Item = styled.div<StyledToolbarItemProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 8px;
    border-radius: 12px;
    margin: 0 4px;
    text-wrap: nowrap;
    cursor: pointer;
    box-sizing: border-box;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

    ${({ $size }) => sizeStyles[$size]}

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    ${({ $selected }) =>
        $selected &&
        css`
            background-color: var(--color-background-base-activated);
        `}

    ${({ $disabled }) =>
        $disabled &&
        css`
            pointer-events: none;
            opacity: 0.48;

            &:hover {
                background-color: initial;
            }
        `}
`;

export const IconGlyph = styled.span<StyledIconGlyphProps>`
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    flex-shrink: 0;
    margin-right: 8px;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
    color: ${({ $color }) => ($color ? ICON_COLOR_VARIABLES[$color] : 'var(--color-text-active)')};

    ${({ $size }) =>
        $size === 'large'
            ? css`
                  width: 24px;
                  height: 24px;
                  font-size: 24px;
                  line-height: 24px;
              `
            : css`
                  width: 20px;
                  height: 20px;
                  font-size: 20px;
                  line-height: 20px;
              `}
`;

export const Label = styled.span`
    margin: 0;
    padding: 0;
    color: var(--color-text-active);
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.2px;
`;
