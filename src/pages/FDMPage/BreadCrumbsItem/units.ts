import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.p<{ isActive: boolean }>`
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.2px;

    color: ${({ isActive }) => (isActive ? theme.colors.textInactive : theme.colors.textLink)};
`;
