import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';
import { Table, TableData } from 'components/ui';

const technologiesColumnSizing = css`
    min-width: 200px;
    width: min(592px, 42%);
    max-width: 592px;

    @media only screen and (max-width: 1440px) {
        max-width: 480px;
        width: min(480px, 42%);
    }

    @media only screen and (max-width: 1200px) {
        max-width: 380px;
        width: min(380px, 42%);
    }

    @media only screen and (max-width: 1024px) {
        max-width: 300px;
        width: min(300px, 100%);
    }
`;

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

export const PatternsTable = styled(Table)`
    width: 100%;
    table-layout: fixed;
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderData)`
    min-width: 0;
    width: auto;
`;

export const TypeColumnHeader = styled(TableHeaderData)`
    width: 168px;
    min-width: 168px;
    max-width: 168px;
`;

export const TechnologiesColumnHeader = styled(TableHeaderData)`
    ${technologiesColumnSizing}
`;

export const TechnologiesColumnData = styled(TableData)`
    ${technologiesColumnSizing}
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

export const OverflowTechnologiesPopoverBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    width: 100%;
    max-height: 280px;
    padding-right: 16px;
    overflow-y: auto;
`;
