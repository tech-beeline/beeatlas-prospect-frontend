import styled from '@emotion/styled';

import { theme } from 'styles';

import { IButton } from './types';

const ButtonBase = styled.button<IButton>`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    font-size: ${theme.text.normal.fontSize};
    line-height: ${theme.text.normal.lineHeight};
    font-weight: 500;
    white-space: nowrap;

    height: 48px;
    max-width: fit-content;
    padding: 13px 20px;

    border-radius: ${theme.borderRadius};

    transition: all 0.2s ease-in-out;

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
    border-radius: ${theme.borderRadius};

    transition: border-color 0.2s ease-in-out;

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
