import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BADGE_COLORS } from './const';
import { StyledBadgeProps } from './types';

export const StyledBadge = styled.span<StyledBadgeProps>`
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: 12px;
    height: 25px;
    font-weight: 400;
    gap: ${({ $hasDot }) => ($hasDot ? '6px' : '4px')};
    background-color: ${({ $type, $semantic }) => BADGE_COLORS[$type][$semantic].backgroundColor};
    color: ${({ $type, $semantic }) => BADGE_COLORS[$type][$semantic].color};

    ${({ $hasDot, $hasIcon }) =>
        ($hasDot || $hasIcon) &&
        css`
            padding-inline-start: 6px;
            padding-inline-end: 12px;
        `}

    ${({ $hasDot, $hasIcon }) =>
        !$hasDot &&
        !$hasIcon &&
        css`
            padding-inline: 12px;
        `}
`;

export const Dot = styled.span<Pick<StyledBadgeProps, '$type' | '$semantic'>>`
    flex-shrink: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ $type, $semantic }) =>
        BADGE_COLORS[$type][$semantic].dotColor ?? BADGE_COLORS[$type][$semantic].color};
`;

export const IconWrapper = styled.span`
    display: inline-flex;
    align-items: center;
    font-size: 18px;
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
    width: 18px;
    height: 18px;
    font-size: 18px;
    line-height: 18px;
    color: inherit;
`;

export const Text = styled.span`
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.2px;
    font-weight: 400;
    color: inherit;
`;
