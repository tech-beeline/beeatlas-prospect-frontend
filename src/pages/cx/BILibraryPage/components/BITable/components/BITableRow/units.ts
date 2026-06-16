import styled from '@emotion/styled';

import { IconButton } from 'components/ui';

export const IconButtonStyled = styled(IconButton)<{ expanded: boolean }>`
    transform: ${({ expanded }) => `rotate(${expanded ? -180 : 0}deg)`};

    transition: all 0.25s;
`;

export const RowStyled = styled.tr<{ expanded?: boolean; isActive?: boolean }>`
    width: 100%;
    max-height: 52px;

    z-index: ${({ isActive }) => (isActive ? 100 : 'auto')};
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};
`;

export const TableDataStyled = styled.td`
    position: relative;
    padding: 8px 16px;

    border-bottom: 1px solid var(--color-border);
`;

export const TdDate = styled(TableDataStyled)`
    width: 106px;
`;

export const TdId = styled(TableDataStyled)`
    width: 140px;
`;

export const SpanLinkStyled = styled.span`
    color: var(--color-text-link);

    cursor: pointer;
`;

export const ActionCell = styled(TableDataStyled)<{
    showShadow: boolean;
    isActive?: boolean;
    expanded?: boolean;
}>`
    position: sticky;
    right: 0;
    border-right: 1px solid var(--color-border);
    background: transparent;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--color-background-base);
        z-index: -2;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        z-index: -1;
    }

    ${({ expanded }) =>
        expanded &&
        `
      &::after {
        background-color: var(--color-background-base-selected);
      }
    `}
    z-index: ${({ isActive }) => (isActive ? 100 : 10)};
    ${({ showShadow }) => (showShadow ? 'box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);' : '')}
    &:not(:last-of-type) {
        ${({ showShadow }) => (showShadow ? 'border-bottom: none;' : '')}
    }
`;

export const LabelTh = styled(TableDataStyled)<{ showShadow: boolean; expanded: boolean }>`
    position: sticky;
    border-left: 1px solid var(--color-border);
    left: 0;
    z-index: 10;
    background: transparent;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--color-background-base);
        z-index: -2;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        z-index: -1;
    }

    ${({ expanded }) =>
        expanded &&
        `
      &::after {
        background-color: var(--color-background-base-selected);
      }
    `}
    ${({ showShadow }) => (showShadow ? 'box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);' : '')}
    &:not(:last-of-type) {
        ${({ showShadow }) => (showShadow ? 'border-bottom: none;' : '')}
    }
`;

export const ExpandedTd = styled.td`
    padding: 0;
    border: none;
    height: auto;
`;

export const ExpandedContentWrapper = styled.div`
    width: 100%;
    padding: 24px 36px;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-background-base);
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 12px;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 4px;
        background-color: var(--color-background-brand);
    }
`;

export const AlignItemsCenterWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
