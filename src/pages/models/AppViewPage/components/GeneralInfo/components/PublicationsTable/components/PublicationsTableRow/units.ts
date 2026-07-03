import styled from '@emotion/styled';

import { IconButton, TableData } from 'components/ui';

export const TableDataFlexWrapper = styled(TableData)`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TableDataFullWidth = styled(TableData)`
    width: 100%;
`;

export const IconButtonStyled = styled(IconButton)<{ expanded: boolean }>`
    margin-right: 4px;
    transform: ${({ expanded }) => `rotate(${expanded ? -180 : 0}deg)`};

    transition: all 0.25s;
`;

export const ExpandedTd = styled.td`
    width: 100%;
    position: relative;
    padding: 24px 36px;
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

export const TrStyled = styled.tr`
    border-bottom: 1px solid var(--color-border);
`;

export const SkeletonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
