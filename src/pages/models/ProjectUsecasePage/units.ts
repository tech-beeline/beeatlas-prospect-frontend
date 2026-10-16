import styled from '@emotion/styled';

import { Table } from 'components/ui';

export const PageWrapper = styled.main`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    min-width: 900px;
    min-height: 100%;
    padding: 32px;
    box-sizing: border-box;
    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const PageHeader = styled.header`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
`;

export const TitleGroup = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-width: 0;
    gap: 12px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 12px;
`;

export const Meta = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 48px;
    margin-top: 4px;
`;

export const MetaItem = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
    table-layout: fixed;
`;

export const ScenarioTable = styled(Table)`
    width: 100%;
`;

export const Relations = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
`;

export const ClampedCell = styled.div`
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

export const DynamicLink = styled.button`
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    color: var(--color-text-link);
    font: inherit;
    cursor: pointer;
`;

export const NotFoundPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 32px;
    background-color: var(--color-background-base);
`;

export const Filters = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
`;

export const SearchField = styled.div`
    flex: 1 1 320px;
    max-width: 560px;
`;

export const StatusField = styled.div`
    flex: 0 1 280px;
`;
