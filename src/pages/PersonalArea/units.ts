import { Search, Table, TableHeaderData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

import { Hint } from 'pages/TechRadarPage/components/LeftMenu/components';

export const PageWrapper = styled.div`
    width: 100%;
    padding: 0px 54px 54px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Title = styled.h4`
    display: flex;
    align-items: center;
    gap: 8px;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);

    width: 798px;
    margin: 40px 0 12px;
`;

export const SearchStyled = styled(Search)`
    margin: 20px 0 16px 0;

    /* Если в компоненте Search есть фильтры, то позиция кнопки очистки высчитывается неверно. */
    /* @TODO: Следить за версиями библиотеки. Когда поправят, этот тихий ужас можно будет убрать. */
    button:nth-of-type(2) {
        left: 240px;

        z-index: 2;
    }

    & > div > div {
        margin-left: 30px;
    }
`;

export const HintStyled = styled(Hint)`
    margin-top: 6px;
`;

export const TableHeaderFlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const TableHeaderDataStyled = styled(TableHeaderData)`
    user-select: none;
    cursor: pointer;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const RolesContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
