import { Checkbox } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    height: 48px;

    font-size: 17px;
    line-height: 22px;
`;

export const CheckboxStyled = styled(Checkbox)`
    user-select: none;
`;
