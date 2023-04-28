import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const OuterLink = styled.a<{ fontSize?: number; noLine?: boolean; isInline?: boolean }>`
    position: relative;

    display: ${({ isInline }) => (isInline ? 'inline' : 'inline-flex')};
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: fit-content;
    padding-top: 1px;

    font-weight: 400;
    font-size: ${({ fontSize = 17 }) => `${fontSize}px`};
    line-height: 22px;
    letter-spacing: 0.2px;
    text-decoration: none;

    color: ${theme.colors.textLink};

    border-bottom: 1px solid;
    border-color: transparent;

    transition: color 0.25s ease-out, border-color 0.15s ease-in-out;

    cursor: pointer;

    &:hover {
        border-color: ${theme.colors.textLink};
    }

    /* overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical; */
`;

export const LinkText = styled.p<{ fontSize?: number; noLine?: boolean; isInline?: boolean }>`
    position: relative;

    display: ${({ isInline }) => (isInline ? 'inline' : 'inline-flex')};
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: fit-content;
    padding-top: 1px;

    font-weight: 400;
    font-size: ${({ fontSize = 17 }) => `${fontSize}px`};
    line-height: 22px;
    letter-spacing: 0.2px;
    text-decoration: none;

    color: ${theme.colors.textLink};

    border-bottom: 1px solid;
    border-color: transparent;

    transition: color 0.25s ease-out, border-color 0.15s ease-in-out;

    cursor: pointer;

    &:hover {
        border-color: ${theme.colors.textLink};
    }

    /* &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 1px;

        background-color: ${({ noLine }) => (noLine ? 'transparent' : theme.colors.textLink)};

        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.25s ease-in-out;
    } */

    @media (hover: hover) {
        ${true &&
        css`
            &:hover::after {
                transform: scaleX(1);
                transform-origin: bottom left;
            }
        `}
    }
`;
