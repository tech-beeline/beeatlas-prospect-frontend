import { TableData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const CellContent = styled.div`
    padding-left: 24px;
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const NotFoundBlockContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
`;
