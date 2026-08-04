import styled from '@emotion/styled';

import { TableData } from 'components/ui';

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const SortingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    cursor: pointer;

    & > button {
        display: none;
    }

    &:hover > button {
        display: block;
    }
`;

export const TableDataMaxWidth = styled(TableData)`
    & > div > div {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
    }
`;
