import styled from '@emotion/styled';

import { TableRow } from 'components/ui';

export const TableRowStyled = styled(TableRow)<{ isExpanded: boolean }>`
    background-color: ${({ isExpanded }) =>
        isExpanded ? 'var(--color-background-base-selected)' : ''};
`;

export const RequirementCellContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const RequirementCellContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ActionContainer = styled.div`
    width: 20px;
    height: 20px;
`;

export const OverflowContainer = styled.p<{ clampNumber: number; ellipsisColor?: string }>`
    display: -webkit-box;
    -webkit-line-clamp: ${({ clampNumber }) => clampNumber};
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: ${({ ellipsisColor = 'var(--color-text-primary)' }) => ellipsisColor};
`;
