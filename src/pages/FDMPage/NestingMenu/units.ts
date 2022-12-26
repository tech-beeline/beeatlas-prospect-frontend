import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    position: sticky;
    top: 0;

    display: flex;

    width: max-content;
    height: 100%;
    /* тк хэдер */
    padding-top: 64px;

    /* overflow: hidden; */
`;

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    width: 56px;
    min-height: calc(100vh - 64px);
    padding-top: 24px;

    border-right: 1px solid ${theme.colors.divider};
`;

export const LeftTab = styled.div<{ isActive: boolean }>`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 48px;
    width: 56px;

    & > * {
        color: ${({ isActive }) =>
            isActive ? theme.colors.textActive : theme.colors.textInactive};

        transition: color 0.25s ease-out;
    }

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

    cursor: pointer;
`;

export const RightSide = styled.div`
    width: 100%;
    min-height: calc(100vh - 64px);
    padding: 24px 16px 16px 0;

    border-right: 1px solid ${theme.colors.divider};
`;
