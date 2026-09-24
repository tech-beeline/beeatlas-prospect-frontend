import styled from '@emotion/styled';

import { Table, TableHeaderData } from 'components/ui';

export const TableStyled = styled(Table)`
    width: 100%;
    table-layout: fixed;

    .dsb_table-cell_flex,
    .dsb_table-cell_flex > div {
        min-width: 0;
        width: 100%;
    }
`;

export const TitleHeader = styled(TableHeaderData)`
    width: 36%;
`;

export const SelectionHeader = styled(TableHeaderData)`
    width: 56px;
`;
