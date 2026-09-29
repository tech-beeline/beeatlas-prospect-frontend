import styled from '@emotion/styled';

import { Table } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Filters = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const FilterControl = styled.div`
    width: 100%;
    max-width: 648px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const EmptyState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
`;
