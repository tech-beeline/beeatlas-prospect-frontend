import styled from '@emotion/styled';

import { Table, TableHeaderData } from 'components/ui';

export const CallsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const TableStyled = styled(Table)`
    table-layout: fixed;
`;

export const TableHeaderDataFixed = styled(TableHeaderData)`
    width: 52px;
`;
export const NotFoundContainer = styled.div`
    margin-top: 80px;
`;
