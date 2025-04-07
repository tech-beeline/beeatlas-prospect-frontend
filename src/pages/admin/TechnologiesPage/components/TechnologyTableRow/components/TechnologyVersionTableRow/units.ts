import { Tooltip } from 'react-tooltip';
import { TableData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

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

export const ButtonsContainer = styled.div`
    position: relative;

    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: flex-end;

    width: 72px;
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const TableDataButtons = styled(TableData)`
    width: 72px;
`;
