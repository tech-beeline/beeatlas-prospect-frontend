import styled from '@emotion/styled';

export const RowStyled = styled.tr<{ isActive?: boolean }>`
    width: 100%;
    max-height: 52px;
    background-color: var(--color-background-base);
    z-index: ${({ isActive }) => (isActive ? 100 : 'auto')};
`;

export const TableDataStyled = styled.td`
    height: 52px;
    padding: 17px 16px;
    background-color: var(--color-background-base);
    border-bottom: 1px solid var(--color-border);

    &:first-of-type {
        position: sticky;
        left: 0;

        min-width: 156px;
        z-index: 10;
    }
`;

export const TdDate = styled(TableDataStyled)`
    width: 106px;
`;

export const TdId = styled(TableDataStyled)`
    width: 140px;
`;

export const ActionCell = styled(TableDataStyled)<{ showShadow: boolean; isActive?: boolean }>`
    position: sticky;
    right: 0;
    border-right: 1px solid var(--color-border);
    z-index: ${({ isActive }) => (isActive ? 100 : 10)};
    ${({ showShadow }) => (showShadow ? 'box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);' : '')}
    &:not(:last-of-type) {
        ${({ showShadow }) => (showShadow ? 'border-bottom: none;' : '')}
    }
`;

export const LabelTh = styled(TableDataStyled)<{ showShadow: boolean; isActive?: boolean }>`
    border-left: 1px solid var(--color-border);
    z-index: ${({ isActive }) => (isActive ? 100 : 10)};
    ${({ showShadow }) => (showShadow ? 'box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);' : '')}
    &:not(:last-of-type) {
        ${({ showShadow }) => (showShadow ? 'border-bottom: none;' : '')}
    }
`;

export const SpanLinkStyled = styled.span`
    color: var(--color-text-link);

    cursor: pointer;
`;

export const Test = styled.div`
    background-color: var(--color-background-base);
`;
