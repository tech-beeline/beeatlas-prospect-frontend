import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';
import { Table } from 'components/ui';

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

    margin: 40px 0 12px;
`;

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;

    margin: 24px 0px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableHeaderDataNoWrap = styled(TableHeaderData)`
    white-space: nowrap;
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderDataNoWrap)`
    width: 100%;
`;

export const OperationContainer = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    overflow: hidden;

    max-width: fit-content;
`;

export const NotFoundContainer = styled.div`
    margin-top: 100px;
`;
