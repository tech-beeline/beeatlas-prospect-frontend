import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const OuterLink = styled.a<{ fontSize?: number; noLine?: boolean; isInline?: boolean }>`
    position: relative;

    display: ${({ isInline }) => (isInline ? 'inline' : 'inline-flex')};
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: fit-content;
    padding-top: 1px;

    font-weight: var(--font-weight-regular);
    font-size: ${({ fontSize = 17 }) => `${fontSize}px`};
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body3);
    text-decoration: none;

    color: var(--color-text-link);

    border-bottom: 1px solid;
    border-color: transparent;

    transition: color 0.25s ease-out, border-color 0.15s ease-in-out;

    cursor: pointer;

    &:hover {
        border-color: var(--color-text-link);
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

    font-weight: var(--font-weight-regular);
    font-size: ${({ fontSize = 17 }) => `${fontSize}px`};
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body3);
    text-decoration: none;

    color: var(--color-text-link);

    border-bottom: 1px solid;
    border-color: transparent;

    transition: color 0.25s ease-out, border-color 0.15s ease-in-out;

    cursor: pointer;

    &:hover {
        border-color: var(--color-text-link);
    }

    /* &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 1px;

        background-color: ${({ noLine }) => (noLine ? 'transparent' : 'var(--color-text-link)')};

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
