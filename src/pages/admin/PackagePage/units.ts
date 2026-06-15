import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';
import { Table } from 'components/ui';

export const PageWrapper = styled.div`
    width: 100%;
    padding: 0px 54px 54px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    overflow-y: scroll;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    margin-top: 40px;
`;

export const Title = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);
`;

export const Identificator = styled.div`
    color: var(--color-text-inactive);

    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    margin: 12px 0px 24px 40px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const HeaderContent = styled.div`
    display: flex;
    gap: 4px;

    cursor: pointer;
`;

export const TableHeaderDataNoWrap = styled(TableHeaderData)`
    white-space: nowrap;
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderDataNoWrap)`
    width: 100%;
`;
