import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isActive?: boolean }>`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 48px;
    padding: 0 32px;

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.textInactive};

    cursor: pointer;
    user-select: none;

    &::before {
        position: absolute;
        left: 0;
        content: '';

        height: 100%;
        width: 4px;

        border-radius: 0px 3px 3px 0px;

        background-color: ${({ isActive }) =>
            isActive ? theme.colors.brandYellow : 'transparent'};

        transition: 0.2s background-color ease-in-out;
    }
`;

export const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;
