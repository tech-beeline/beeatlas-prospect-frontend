import { Table } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const TableContainer = styled.div`
    max-width: 100%;
    overflow-x: auto;

    border-radius: 12px;
    border: 1px solid var(--color-divider);
`;

export const TableStyled = styled(Table)`
    width: 100%;
    margin: 0;
    box-shadow: none;
`;
