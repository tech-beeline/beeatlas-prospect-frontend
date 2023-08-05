// import { css } from '@emotion/react';
import { Icon } from '@beeline/lk-ui';
import styled from '@emotion/styled';

import { Expand } from 'components/other';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isActive?: boolean; isSubItems?: boolean }>`
    position: relative;

    display: flex;
    align-items: center;
    gap: 16px;

    /* height: 48px; */
    min-height: 48px;
    padding: 6px 16px;
    margin-bottom: 4px;

    font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: ${({ isActive }) => (isActive ? theme.colors.textActive : theme.colors.textInactive)};
    background-color: ${({ isActive }) =>
        isActive ? 'var(--color-background-base-hover)' : 'var(--color-background-base)'};

    border-radius: var(--size-border-radius-x6);

    transition: all 0.25s ease-out;

    cursor: pointer;
    user-select: none;

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    &:active {
        background-color: var(--color-background-base-selected);
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

export const IconStyled = styled(Icon)`
    color: ${({ type }) => !type && theme.colors.textInactive};
`;

export const Name = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
`;
