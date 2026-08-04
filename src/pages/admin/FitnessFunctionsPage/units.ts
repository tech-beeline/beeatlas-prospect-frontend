import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';
import { Table } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const TableHeaderDataButtons = styled(TableHeaderData)`
    width: 52px;
`;

export const NotFoundContainer = styled.div`
    margin-top: 160px;
`;
