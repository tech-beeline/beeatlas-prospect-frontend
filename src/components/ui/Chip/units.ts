import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledChipProps } from './types';

const baseStyles = css`
    height: 32px;
    width: fit-content;
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
    cursor: auto;
    color: var(--color-text-active);
    max-width: 100%;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

    &:disabled {
        opacity: 0.48;
        cursor: auto;
        user-select: none;
    }

    &:disabled:focus-visible {
        outline: none;
    }
`;

export const StyledChip = styled.button<StyledChipProps>`
    ${baseStyles}

    ${({ $hasStartAdornment }) =>
        $hasStartAdornment &&
        css`
            padding-left: 8px;
        `}

    ${({ $hasEndAdornment }) =>
        $hasEndAdornment &&
        css`
            padding-right: 8px;
        `}

    ${({ $active }) =>
        $active &&
        css`
            background-color: #fdd835;
            color: rgba(9, 11, 22, 0.94);

            .dsb_chip__end-icon {
                color: rgba(25, 28, 52, 0.7);
            }
        `}

    ${({ $clickable, $disabled, $active }) =>
        $clickable &&
        !$disabled &&
        css`
            cursor: pointer;
            pointer-events: auto;

            &:hover {
                background-color: var(--color-control-background-hover);
            }

            &:focus-visible {
                border-color: var(--color-border-focus);
            }

            &:active {
                background-color: var(--color-control-background-pressed);
            }

            ${$active &&
            css`
                &:hover {
                    background-color: #fdc435;
                }

                &:focus-visible {
                    border-color: var(--color-border-focus);
                }

                &:active {
                    background-color: #fdb435;
                }
            `}
        `}

    ${({ $dragged }) =>
        $dragged &&
        css`
            box-shadow: 0 6px 38px rgba(0, 0, 0, 0.16), 0 0 10px rgba(0, 0, 0, 0.08);
        `}
`;

export const TitleWrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
`;

export const Title = styled.p`
    margin: 0;
    white-space: nowrap;
    color: inherit;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.2px;
`;

export const Adornment = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    &.dsb_chip__start-icon {
        margin-right: 8px;
        color: inherit;
    }

    &.dsb_chip__end-icon {
        margin-left: 8px;
        color: var(--color-text-inactive);
    }

    .dsb_icon,
    .beeline-icons {
        color: inherit;
    }
`;
