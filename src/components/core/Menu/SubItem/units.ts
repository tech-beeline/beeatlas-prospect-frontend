import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;

    height: 48px;
    padding: 0 16px 0 56px;

    font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
    font-size: 15px;
    line-height: 18px;

    color: ${({ isActive }) => (isActive ? theme.colors.textActive : theme.colors.textInactive)};
    background-color: ${({ isActive }) =>
        isActive ? theme.colors.backgroundSelected : 'transparent'};

    border-radius: var(--size-border-radius-x6);

    transition: all 0.25s ease-out;

    cursor: pointer;
    user-select: none;

    &:hover {
        background-color: ${theme.colors.backgroundHover};
    }

    &:active {
        background-color: ${theme.colors.backgroundSelected};
    }
`;
