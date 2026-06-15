import styled from '@emotion/styled';

import { TableData } from 'components/ui';

export const CellContent = styled.div`
    padding-left: 24px;
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const NotFoundBlockContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
`;

export const TableDataEmpty = styled(TableData)`
    position: relative;
    padding-left: 64px;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 4px;
        background-color: var(--color-background-brand);
    }
`;
