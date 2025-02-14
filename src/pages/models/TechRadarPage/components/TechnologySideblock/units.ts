import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

import { Text } from 'components/core';

export const Container = styled.div`
    padding: 20px 16px;

    max-height: calc(100vh - 64px);
    min-width: 320px;

    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
`;

export const Title = styled.h5`
    font-weight: var(--font-weight-h5);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 24px;
`;

export const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    margin-top: 24px;
`;

export const DescriptionHeader = styled(Text)`
    margin-top: 12px;
`;

export const SubtitleMargin = styled.div`
    margin-top: 24px;
`;

export const LastChanges = styled(Text)`
    margin-top: 12px;
`;

export const AppsContainer = styled.div<{ open: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 24px;

    height: ${({ open }) => (open ? 'auto' : '0px')};

    margin-top: ${({ open }) => (open ? '12px' : '0px')};

    overflow: hidden;

    transition: all 0.25s;
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;

export const TooltipContainer = styled(Tooltip)<{ largePadding?: boolean }>`
    max-width: 300px;
    width: max-content;
    padding: ${({ largePadding }) => (largePadding ? '16px' : '4px 8px')};

    background-color: var(--color-border-focus);
    color: var(--color-text-active-inverse);

    border-radius: ${({ largePadding }) =>
        largePadding ? 'var(--size-border-radius-x8)' : 'var(--size-border-radius-x4)'};

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    text-align: start;
    white-space: pre-line;

    user-select: none;

    z-index: 30;
`;
