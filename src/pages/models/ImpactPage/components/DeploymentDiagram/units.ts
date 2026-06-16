import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';
import { Table, TableData } from 'components/ui';

export const TableHeaderDataFullWidth = styled(TableHeaderData)`
    & > div > div {
        width: 100%;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 100%;
`;

export const TableContainer = styled.div`
    position: sticky;
    top: 0px;
`;

export const TableStyled = styled(Table)`
    width: 100%;

    table-layout: fixed;
`;

export const IconsContainer = styled.div`
    display: flex;
    gap: 16px;
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const DiagramImage = styled.img`
    width: 100%;
`;

export const DiagramContainer = styled.div`
    height: 100%;
    width: 100%;
    max-height: calc(100vh - 222px);

    overflow: hidden;

    cursor: grab;
`;

export const Diagram = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
`;

export const DiagramDialogContainer = styled.div`
    height: 100%;
    max-height: calc(100vh - 240px);
    width: calc(100vw - 320px);

    overflow: hidden;

    cursor: grab;
`;

export const DiagramDialog = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 500px;
    height: 100%;
    width: 100%;
`;
