import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '../Button';

export const Root = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const Item = styled.li<{ $first?: boolean }>`
    ${({ $first }) =>
        !$first &&
        css`
            margin-left: 8px;
        `}
`;

const cellBaseStyles = css`
    width: 40px;
    height: 40px;
    min-height: 40px;
    border-radius: 12px;
    border-color: transparent;
    background-color: transparent;
    color: var(--color-text-active);
    padding: 8px;
    border-width: 0;
    transition: none;

    &:focus-visible {
        border: 1px solid var(--color-border-focused);
    }

    &:active {
        border-width: 0;
    }
`;

const cellTextActiveStyles = css`
    background-color: #fdd835;
    color: rgba(9, 11, 22, 0.94);
    border-width: 0;

    &:focus-visible {
        border: 1px solid var(--color-border-focused);
        background-color: #fdd835;
        color: rgba(9, 11, 22, 0.94);
    }

    &:not(:disabled):hover,
    &:not(:disabled):active {
        background-color: #fdd835;
    }
`;

export const TextCell = styled(Button)<{ $active?: boolean }>`
    ${cellBaseStyles}
    ${({ $active }) => $active && cellTextActiveStyles}
`;

export const IconCell = styled(Button)<{ $dots?: boolean }>`
    ${cellBaseStyles}

    ${({ $dots }) =>
        $dots &&
        css`
            pointer-events: none;
            cursor: default;
            color: var(--color-text-disabled);
        `}
`;

export const IconGlyph = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;

    &.dsb_icon--large {
        width: 24px;
        height: 24px;
        font-size: 24px;
        line-height: 24px;
    }
`;
