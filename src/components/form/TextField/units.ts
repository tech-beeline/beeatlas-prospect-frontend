import { TextField } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const TextFieldStyled = styled(TextField)`
    input[type='number'] {
        -moz-appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;
