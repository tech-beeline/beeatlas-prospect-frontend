import { Select } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const InputStyled = styled.input`
    min-width: 10px;
    width: 100%;
    height: 52px;

    padding: 0px 16px;

    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 18px;

    border-radius: 0px;
    border: 1px solid var(--color-border-focused);
`;

export const TextAreaStyled = styled.textarea`
    min-width: 10px;
    width: 100%;
    height: 52px;

    padding: 16px 16px;

    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 18px;

    border-radius: 0px;
    border: 1px solid var(--color-border-focused);
`;

export const SelectStyled = styled.select`
    min-width: 10px;
    width: 100%;
    height: 52px;

    padding: 0px 16px;

    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 18px;

    border-radius: 0px;
    border: 1px solid var(--color-border-focused);
`;

export const MultiSelectStyled = styled(Select)`
    min-width: 10px;
    width: 100%;
    height: 52px;

    padding: 0px 16px;

    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 18px;

    border-radius: 0px;
    border: 1px solid var(--color-border-focused);
`;
