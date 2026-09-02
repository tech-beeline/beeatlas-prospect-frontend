import styled from '@emotion/styled';

import { Table, TableData, TableHeaderData } from 'components/ui';

export const TableStyled = styled(Table)`
    width: 100%;
    table-layout: fixed;
`;

export const TableHeaderDataFixed = styled(TableHeaderData)`
    width: 52px;
`;

export const TableDataStyled = styled(TableData)`
    & > div > div {
        max-width: 100%;
    }
`;

export const NameContainer = styled.div`
    overflow: hidden;
    word-break: break-anywhere;
`;
