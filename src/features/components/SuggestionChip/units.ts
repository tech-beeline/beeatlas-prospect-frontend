import { css } from '@emotion/react';
import styled from '@emotion/styled';

const chipStyles = css`
    height: 32px;
    width: fit-content;
    max-width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border-radius: 30px;
    box-sizing: border-box;
    border: 1px solid transparent;
    background-color: var(--color-control-background);
    padding: 0 12px;
    transition: 125ms cubic-bezier(0, 0, 0.2, 1);
    cursor: pointer;
    color: var(--color-text-active);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

    &:hover {
        background-color: var(--color-control-background-hover);
    }

    &:focus-visible {
        border-color: var(--color-border-focus);
    }

    &:active {
        background-color: var(--color-control-background-pressed);
    }
`;

export const ChipStyled = styled.button`
    ${chipStyles}
`;

export const ChipTitle = styled.span`
    min-width: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.2px;
`;
