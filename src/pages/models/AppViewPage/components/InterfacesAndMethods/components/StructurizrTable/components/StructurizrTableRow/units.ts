import styled from '@emotion/styled';

import { TableRow } from 'components/ui';

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const IconButtonContainer = styled.div`
    width: 20px;
    height: 20px;
`;

export const TableRowStyled = styled(TableRow)<{ expanded?: boolean }>`
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
`;

export const TableHeadContainer = styled.div<{ first?: boolean }>`
    font-weight: 500;

    ${({ first }) => (first ? 'padding-left: 24px;' : '')}
`;
