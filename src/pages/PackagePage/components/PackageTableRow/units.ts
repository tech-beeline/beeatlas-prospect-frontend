import { IconButton, TableData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const IconButtonStyled = styled(IconButton)<{ expanded: boolean }>`
    transform: ${({ expanded }) => `rotate(${expanded ? -180 : 0}deg)`};

    transition: all 0.25s;
`;

export const TableDataStyled = styled(TableData)`
    white-space: pre-wrap;

    border-left: 4px solid var(--color-background-brand);
`;

export const MoreButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: end;
`;
