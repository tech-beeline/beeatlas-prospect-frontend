import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Expand } from 'components/other';

export const Wrapper = styled.div<{ isActive?: boolean; isSubItems?: boolean }>`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 48px;
    padding: 0 16px 0 32px;

    font-weight: ${({ isActive }) =>
        isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)'};
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: ${({ isActive }) =>
        isActive ? 'var(--color-text-active)' : 'var(--color-text-inactive)'};

    border-radius: 0px var(--size-border-radius-x6) var(--size-border-radius-x6) 0px;

    transition: all 0.25s ease-out;

    cursor: pointer;
    user-select: none;

    &::before {
        position: absolute;
        left: 0px;
        content: '';

        height: 100%;
        width: 4px;

        border-radius: 0px 3px 3px 0px;

        background-color: ${({ isActive }) =>
            isActive ? 'var(--color-background-brand)' : 'transparent'};

        transition: 0.25s background-color ease-out;
    }

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    ${({ isSubItems }) =>
        !isSubItems &&
        css`
            &:active {
                background-color: var(--color-background-base-selected);
            }
        `}
`;

export const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const ExpandStyled = styled(Expand)`
    padding-left: 16px;
`;
