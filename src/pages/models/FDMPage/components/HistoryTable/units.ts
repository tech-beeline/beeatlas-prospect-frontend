import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;

    padding-bottom: 32px;
`;

export const CustomLink = styled.div`
    color: var(--color-text-link);

    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const TableHeaderDataStyled = styled(TableHeaderData)`
    width: 24px;
`;
