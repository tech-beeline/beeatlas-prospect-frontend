import Input from 'react-phone-number-input/input';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from 'styles';

import * as T from './types';

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;

    width: 100%;
    height: 80px;
`;

const inputStyles = css`
    width: 100%;
    height: 48px;
    padding: 14px 16px;

    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    text-overflow: ellipsis;

    border: 1px solid;
    border-radius: var(--size-border-radius-x6);

    cursor: pointer;

    transition: all 0.25s ease-out;
`;

export const InputStyled = styled.input<T.IInput>`
    ${inputStyles}

    border-color: ${({ isFocused }) => (isFocused ? theme.colors.black : 'transparent')};

    background-color: ${({ isFocused }) =>
        isFocused ? 'transparent' : theme.colors.componentGray};
`;

export const InputPhoneStyled = styled(Input)<T.IInput>`
    width: 100%;
    height: 48px;

    padding: 14px 16px;

    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    border: 1px solid;
    border-color: ${({ isFocused, isValid }) =>
        isFocused ? theme.colors.black : !isValid ? theme.colors.borderError : 'transparent'};
    border-radius: var(--size-border-radius-x6);

    background-color: ${({ isFocused, isValid }) =>
        isFocused
            ? 'transparent'
            : !isValid
            ? theme.colors.backgroundError
            : theme.colors.componentGray};

    cursor: pointer;

    text-overflow: ellipsis;

    transition: all 0.25s ease-out;
`;

export const Label = styled.label`
    letter-spacing: var(--font-letter-spacing-body3);
`;
