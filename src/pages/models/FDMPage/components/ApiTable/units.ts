import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';

export const TableHeaderDataMaxWidth = styled(TableHeaderData)`
    width: 100%;
`;

export const NotFoundWrapper = styled.div`
    display: flex;
    justify-content: center;

    padding: 32px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;

    max-width: 600px;
`;
