import styled from '@emotion/styled';

import { Select } from 'components/ui';

export const InputStyled = styled.input<{ hasError?: boolean }>`
    box-sizing: border-box;
    min-width: 10px;
    width: 100%;
    height: 52px;

    padding: 0px 16px;

    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 18px;

    border-radius: 0px;
    border: 1px solid
        ${({ hasError }) =>
            hasError ? 'var(--color-border-error)' : 'var(--color-border-focused)'};
`;

export const TextAreaStyled = styled.textarea`
    min-width: 10px;
    width: 100%;
    min-height: 52px;

    padding: 16px 16px;

    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 18px;

    border-radius: 0px;
    outline: 1px solid var(--color-border-focused);
`;

export const SelectStyled = styled(Select)`
    > div > div {
        border-radius: 0 !important;
        background-color: transparent !important;
    }

    > div > div > input {
        border-radius: 0 !important;
        background-color: transparent !important;
    }

    > div > div > div > span {
        display: none;
    }
`;
