import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isActive?: boolean }>`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 48px;
    padding: 0 16px;

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    color: ${({ isActive }) => (isActive ? theme.colors.textActive : theme.colors.textInactive)};

    transition: 0.25s color ease-out;

    cursor: pointer;
    user-select: none;

    &::before {
        position: absolute;
        left: -16px;
        content: '';

        height: 100%;
        width: 4px;

        border-radius: 0px 3px 3px 0px;

        background-color: ${({ isActive }) =>
            isActive ? theme.colors.brandYellow : 'transparent'};

        transition: 0.25s background-color ease-out;
    }
`;

export const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;
