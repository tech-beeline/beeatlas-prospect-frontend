import styled from '@emotion/styled';

import { Icon, TableData } from 'components/ui';
export const OverflowContainer = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;

    max-width: fit-content;
`;

export const ButtonsContainer = styled.div`
    position: relative;

    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: flex-end;
`;

export const IconStyled = styled(Icon)`
    cursor: pointer;

    color: var(--color-text-inactive);

    &:hover {
        color: var(--color-text-active);
    }
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;
