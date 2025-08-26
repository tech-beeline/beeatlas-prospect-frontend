import { TableData, TableHeaderData } from '@beeline/design-system-react';
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
