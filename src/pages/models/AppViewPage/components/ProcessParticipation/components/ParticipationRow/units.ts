import styled from '@emotion/styled';

import { TableData, TableRow } from 'components/ui';

export const RowStyled = styled(TableRow)<{ expanded: boolean }>`
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : 'transparent'};
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const NameText = styled.div`
    display: flex;
    flex-direction: column;
`;

export const NestedContainer = styled.div`
    width: 100%;
    padding: 24px;

    & > table {
        width: 100%;
        margin: 0;
    }

    border-left: 4px solid var(--color-background-brand);
`;

export const NestedCell = styled(TableData)`
    padding: 0;

    & > div > div {
        width: 100%;
    }
`;
