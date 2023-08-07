import { Checkbox } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    height: 48px;

    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;

export const CheckboxStyled = styled(Checkbox)`
    user-select: none;
`;
