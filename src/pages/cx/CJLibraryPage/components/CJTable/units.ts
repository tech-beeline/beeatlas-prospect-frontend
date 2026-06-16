import styled from '@emotion/styled';

import { TableData } from 'components/ui';

export const TableStyled = styled.table`
    width: 100%;

    border-spacing: 0;
`;

export const CJTableContainer = styled.div`
    position: relative;

    display: flex;

    width: 100%;
    max-height: calc(100vh - 280px);
    overflow: auto;
`;

export const OverflowContainer = styled.div`
    overflow: hidden;
    border-radius: 12px;
`;

export const Tbody = styled.tbody`
    width: 100%;

    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
`;

export const Thead = styled.thead`
    position: sticky;
    top: 0;

    width: 100%;
    max-height: 56px;
    text-align: left;

    z-index: 11;
`;

export const Th = styled.th`
    padding: 8px 16px;
    height: 56px;
    font-weight: var(--font-weight-subtitle3);
    font-size: var(--font-size-subtitle3);
    line-height: var(--font-line-height-subtitle3);
    background-color: var(--color-background-base);
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);

    &:first-of-type {
        position: sticky;
        left: 0;
        top: 0;

        min-width: 156px;
        border-top-left-radius: 12px;
        border-left: 1px solid var(--color-border);
        z-index: 10;
    }

    &:last-of-type {
        position: sticky;
        right: 0;

        top: 0;
        width: 52px;
        border-top: 0;
        z-index: 10;
    }
`;

export const LabelTh = styled(Th)<{ showShadow: boolean; right?: boolean }>`
    ${({ showShadow }) => (showShadow ? 'box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);' : '')}
`;

export const LastTh = styled(LabelTh)`
    padding: 0;
`;

export const BorderDiv = styled.div`
    width: 100%;
    height: 100%;

    border-top-right-radius: 12px;
    border-top: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
`;

export const ThDate = styled(Th)`
    width: 106px;
`;

export const ThID = styled(Th)`
    width: 140px;
`;

export const Row = styled.tr`
    max-height: 52px;
`;

export const TdPagination = styled(TableData)`
    height: 52px;
    padding: 0 4px;
    border-bottom: 1px solid var(--color-border);
    border-left: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
`;
