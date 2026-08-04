import styled from '@emotion/styled';

import { Table } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    flex: 1;
    max-width: 797px;
`;

export const SelectContainer = styled.div`
    flex: 1;
    max-width: 360px;
`;

export const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const TableLayout = styled(Table)`
    table-layout: fixed;
    width: 100%;
`;

export const AutocompleteOptionRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const EmptyStateContainer = styled.div`
    width: 100%;
    padding: 64px 0;
`;
