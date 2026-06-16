import styled from '@emotion/styled';

import { TableData, TableRow } from 'components/ui';

export const TableRowStyled = styled(TableRow)<{ expanded?: boolean }>`
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
        max-width: 100%;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`;

export const ImageContainer = styled.div`
    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    max-width: calc(100vw - 156px);

    overflow: auto;
`;

export const ImageStyled = styled.img`
    max-width: none;
    max-height: none;
`;
