import styled from '@emotion/styled';

import { TableData } from 'components/ui';

export const FlexContainer = styled.div`
    display: flex;
    gap: 16px;
`;

export const TableDataMaxWidth = styled(TableData)`
    & > div > div {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
    }
`;
