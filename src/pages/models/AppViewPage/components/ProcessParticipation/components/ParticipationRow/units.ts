import styled from '@emotion/styled';

import { TableRow } from 'components/ui';

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
    padding: 16px 16px 16px 24px;

    border-left: 4px solid var(--color-background-brand);
`;
