import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';
import { TableData } from 'components/ui';

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    flex: 3;
`;

export const SelectContainer = styled.div`
    flex: 1;
`;

export const SelectOption = styled.div`
    display: flex;
    align-items: center;

    white-space: break-spaces;
`;

export const EmptyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 32px;
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderData)`
    width: 100%;
`;

export const TableDataContainer = styled(TableData)`
    padding: 8px;
`;
