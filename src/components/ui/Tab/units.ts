import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const getTabRootStyles = (iconOnly?: boolean, selected?: boolean) => css`
    height: 100%;
    min-height: 47px;
    padding: 0 24px;
    border: 1px solid transparent;
    border-radius: 12px;
    background-color: transparent;
    color: var(--color-text-inactive);
    transition: color 150ms ease-out;
    text-decoration: none;
    cursor: pointer;
    font-family: inherit;

    &:focus-visible:not(:disabled) {
        border-color: var(--color-border-focus);
    }

    &:disabled {
        cursor: default;
        opacity: 0.48;
    }

    &:hover:not(:disabled) {
        color: var(--color-text-active);
    }

    &:hover:not(:disabled) .dsb_tab-new__indicator {
        background-color: var(--color-control-background-hover);
    }

    &:active:not(:disabled) .dsb_tab-new__indicator {
        background-color: var(--color-control-background-pressed);
    }

    ${iconOnly &&
    css`
        padding: 0 12px;
    `}

    ${selected &&
    css`
        color: var(--color-text-active);
    `}
`;

export const TabContent = styled.div`
    position: relative;
    height: 100%;
    min-width: 40px;
    padding: 12px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: inherit;
`;

export const TabLabel = styled.span`
    color: inherit;
    white-space: nowrap;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.2px;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

export const TabIndicator = styled.div`
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 3px;
    background-color: transparent;
    border-radius: 4px 4px 0 0;
    transition: background-color 150ms ease-out;
`;
