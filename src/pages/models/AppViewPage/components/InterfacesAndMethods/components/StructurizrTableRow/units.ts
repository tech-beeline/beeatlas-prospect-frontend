import { TableRow } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TableRowStyled = styled(TableRow)<{ expanded?: boolean }>`
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
`;
