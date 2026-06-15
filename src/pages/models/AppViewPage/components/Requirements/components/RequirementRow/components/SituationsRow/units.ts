import styled from '@emotion/styled';

import { TableData } from 'components/ui';

export const CellContent = styled.div`
    padding-left: 24px;
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TableDataStyled = styled(TableData)`
    position: relative;
    padding: 0px;
    padding-left: 44px;

    & > div > div {
        width: 100%;
    }

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

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SituationContainer = styled.div`
    padding: 12px 0;
`;
