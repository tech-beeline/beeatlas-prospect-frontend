import { TableData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const ButtonsContainer = styled.div`
    position: relative;

    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: flex-end;

    width: 72px;
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const TableDataButtons = styled(TableData)`
    width: 72px;
`;
