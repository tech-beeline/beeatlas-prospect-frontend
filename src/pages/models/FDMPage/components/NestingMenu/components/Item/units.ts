import styled from '@emotion/styled';

import { Expand } from 'components/other';
import { Icon, Skeleton } from 'components/ui';
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

    color: ${({ isActive }) =>
        isActive ? 'var(--color-text-active)' : 'var(--color-text-inactive)'};
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

export const ArrowContainer = styled.div`
    min-width: 24px;
    min-height: 24px;
`;

export const ExpandStyled = styled(Expand)`
    padding-left: 36px;
`;

export const IconStyled = styled(Icon)`
    color: ${({ type }) => !type && 'var(--color-text-inactive)'};
`;

export const SkeletonStyled = styled(Skeleton)`
    margin-bottom: 4px;
`;

export const Name = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
`;
