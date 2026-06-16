import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    flex: 1;
    max-width: 648px;
`;

export const EmptyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 32px;

    border-radius: var(--size-border-radius-x8);
    border: 1px solid var(--color-divider);
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderData)`
    width: 100%;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 100px;
`;
