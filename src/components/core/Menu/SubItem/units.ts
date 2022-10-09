import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;

    height: 48px;
    padding: 0 16px 0 56px;

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    color: ${({ isActive }) => (isActive ? theme.colors.textActive : theme.colors.textInactive)};
    background-color: ${({ isActive }) =>
        isActive ? theme.colors.backgroundSelected : 'transparent'};

    border-radius: ${theme.borderRadius};

    cursor: pointer;
    user-select: none;
`;
