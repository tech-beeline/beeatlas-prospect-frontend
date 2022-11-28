// import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Expand } from 'components/other';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isActive?: boolean; isSubItems?: boolean }>`
    position: relative;

    display: flex;
    align-items: center;
    gap: 16px;

    height: 48px;
    padding: 6px 16px;

    font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
    font-size: 15px;
    line-height: 18px;

    color: ${({ isActive }) => (isActive ? theme.colors.textActive : theme.colors.textInactive)};
    background-color: ${({ isActive }) =>
        isActive ? theme.colors.backgroundHover : theme.colors.backgroundLow};

    border-radius: 12px;

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

export const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    min-width: 0; */
`;

export const ExpandStyled = styled(Expand)`
    padding-left: 36px;
`;
