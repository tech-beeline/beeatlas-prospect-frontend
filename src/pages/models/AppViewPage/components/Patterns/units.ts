import { TableHeaderData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    flex: 1;
    max-width: 797px;
`;

export const SelectContainer = styled.div`
    flex: 1;
    max-width: 360px;
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderData)`
    width: 100%;
`;
