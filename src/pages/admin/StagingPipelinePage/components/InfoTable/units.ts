import styled from '@emotion/styled';

import { Table, TableHeaderData } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableHeaderDataNoWrap = styled(TableHeaderData)`
    white-space: nowrap;
`;
