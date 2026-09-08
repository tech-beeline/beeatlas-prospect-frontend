import styled from '@emotion/styled';

import { Table as UITable, TableData } from 'components/ui';

export const ScrollArea = styled.div`
    flex: 1;
    width: 100%;
    min-height: 0;
    overflow-y: auto;
    scroll-behavior: smooth;
`;

export const Layout = styled.div`
    display: grid;
    grid-template-columns: minmax(128px, 1fr) minmax(0, 910px) minmax(128px, 1fr);
    gap: 24px;
    justify-content: center;
    width: 100%;
    padding: 32px 24px 48px;

    @media (max-width: 900px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

export const Content = styled.div`
    display: flex;
    grid-column: 2;
    grid-row: 1;
    width: 100%;
    max-width: 910px;
    min-width: 0;
    flex-direction: column;
    gap: 32px;

    @media (max-width: 900px) {
        grid-column: 1;
    }
`;

export const Stats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const StatCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const StatValue = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const ResultSection = styled.section`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 16px;
    scroll-margin-top: 24px;
`;

export const Chips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const Table = styled(UITable)`
    width: 100%;
`;

export const EntityName = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const CallValue = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const NoticeItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const Navigation = styled.aside`
    position: sticky;
    top: 32px;
    grid-column: 3;
    grid-row: 1;
    align-self: start;
    width: 100%;
    max-width: 128px;

    & > div {
        width: 100%;
    }

    @media (max-width: 900px) {
        display: none;
    }
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const NoDataContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    padding: 24px 0px;
`;
