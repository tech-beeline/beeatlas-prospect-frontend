import { Table, TableData, TableHeaderData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

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
    overflow: hidden;

    width: 100%;
    max-height: calc(100vh - 222px);
`;

export const Diagram = styled.div`
    max-height: 100%;
    max-width: 100%;
`;

export const DiagramDialogContainer = styled.div`
    overflow: hidden;

    height: calc(100vh - 240px);
    width: calc(100vw - 320px);
`;

export const DiagramDialog = styled.div`
    height: 100%;
    width: 100%;
`;
