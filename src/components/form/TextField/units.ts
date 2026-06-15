import styled from '@emotion/styled';

import { TextField } from 'components/ui';

export const TextFieldStyled = styled(TextField)`
    input[type='number'] {
        -moz-appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;
