import styled from '@emotion/styled';

import { theme } from 'styles';

import { IButton } from './types';

const ButtonBase = styled.button<IButton>`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    font-weight: var(--font-weight-medium);
    white-space: nowrap;

    height: 48px;
    max-width: fit-content;
    padding: 13px 20px;

    border-radius: var(--size-border-radius-x6);

    transition: all 0.25s ease-out;

    user-select: none;

    &:not(:disabled):hover {
        cursor: pointer;
    }
`;

export const Button = styled(ButtonBase)`
    background-color: ${theme.colors.primary};

    &:hover {
        background-color: ${theme.colors.primaryDarker};
    }

    &:disabled {
        color: ${theme.colors.disabledGray};
        background-color: ${theme.colors.primaryDisabled};
        cursor: not-allowed;
    }

    &:active {
        background-color: ${theme.colors.primaryDisabled};
    }
`;

export const IconButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    background-color: transparent;

    border: 1px solid;
    border-color: ${theme.colors.borderGray};
    border-radius: var(--size-border-radius-x6);

    transition: border-color 0.25s ease-out;

    &:hover {
        border-color: ${theme.colors.black};
    }

    &:active {
        border-color: ${theme.colors.borderGray};
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    gap: 8px;
`;
