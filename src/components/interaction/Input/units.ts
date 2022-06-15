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

    font-size: ${theme.text.normal.fontSize};
    line-height: ${theme.text.normal.lineHeight};
    text-overflow: ellipsis;

    border: 1px solid;
    border-radius: ${theme.borderRadius};

    cursor: pointer;

    transition: all 0.2s ease-in-out;
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

    font-size: ${theme.text.normal.fontSize};
    line-height: ${theme.text.normal.lineHeight};

    border: 1px solid;
    border-color: ${({ isFocused, isValid }) =>
        isFocused ? theme.colors.black : !isValid ? theme.colors.borderError : 'transparent'};
    border-radius: ${theme.borderRadius};

    background-color: ${({ isFocused, isValid }) =>
        isFocused
            ? 'transparent'
            : !isValid
            ? theme.colors.backgroundError
            : theme.colors.componentGray};

    cursor: pointer;

    text-overflow: ellipsis;

    transition: all 0.2s ease-in-out;
`;

export const Label = styled.label`
    letter-spacing: 0.2px;
`;
