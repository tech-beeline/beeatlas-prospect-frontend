import styled from '@emotion/styled';

import { TableData } from 'components/ui';

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
