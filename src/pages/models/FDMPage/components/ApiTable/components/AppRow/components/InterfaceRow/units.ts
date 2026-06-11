import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';
import { Table, TableData } from 'components/ui';

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    padding-left: 24px;
`;

export const TableDataStyled = styled(TableData)`
    padding: 0;

    & > div > div {
        width: 100%;
    }
`;

export const InterfaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;

    padding: 24px 24px 24px 44px;

    border-left: 4px solid var(--color-background-brand);
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderData)`
    width: 100%;
`;
