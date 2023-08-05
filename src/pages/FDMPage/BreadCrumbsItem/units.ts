import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.p<{ isActive: boolean }>`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: 18px;
    letter-spacing: 0.2px;

    color: ${({ isActive }) => (isActive ? theme.colors.textInactive : theme.colors.textLink)};
`;
