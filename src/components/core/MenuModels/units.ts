import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    position: fixed;
    left: 0;

    display: flex;
    flex-direction: column;
    gap: 4px;

    width: 56px;
    min-height: 100vh;
    padding-top: 88px;

    border-right: 1px solid ${theme.colors.divider};

    z-index: 10;
`;

export const LinkStyled = styled(Link)<{ isActive: boolean }>`
    pointer-events: ${({ isActive }) => (isActive ? 'none' : 'initial')};
`;

export const Tab = styled.div<{ isActive: boolean }>`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 48px;
    width: 56px;

    border-radius: 0px var(--size-border-radius-x6) var(--size-border-radius-x6) 0px;

    transition: background-color 0.25s ease-out;

    & > * {
        color: ${({ isActive }) =>
            isActive ? theme.colors.textActive : theme.colors.textInactive};

        transition: color 0.25s ease-out;
    }

    pointer-events: ${({ isActive }) => (isActive ? 'none' : 'initial')};

    &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';

        height: 100%;
        width: 4px;

        border-radius: 0px 3px 3px 0px;

        background-color: ${({ isActive }) =>
            isActive ? theme.colors.brandYellow : 'transparent'};

        transition: background-color 0.25s ease-out;
    }

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    cursor: pointer;
`;
