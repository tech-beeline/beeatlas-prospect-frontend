import { Icon } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: 100%;
    padding: 8px 16px;
`;

export const IconStyled = styled(Icon)`
    border-radius: 50%;

    cursor: pointer;
`;
