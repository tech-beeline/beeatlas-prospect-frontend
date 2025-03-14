import { Tooltip } from 'react-tooltip';
import { TableHeaderData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    position: relative;

    width: 100%;

    padding: 32px 52px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderData)`
    width: 100%;
`;

export const FileNameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const NotFoundContainer = styled.div`
    margin-top: 140px;
`;

export const TooltipContainer = styled(Tooltip)<{ largePadding?: boolean }>`
    max-width: 300px;
    width: max-content;
    padding: ${({ largePadding }) => (largePadding ? '16px' : '4px 8px')};

    background-color: var(--color-background-inverse);
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
