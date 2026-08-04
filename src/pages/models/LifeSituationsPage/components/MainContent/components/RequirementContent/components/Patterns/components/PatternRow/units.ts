import styled from '@emotion/styled';

import { TableData, TableRow } from 'components/ui';

export const TableRowStyled = styled(TableRow)<{ isExpanded: boolean }>`
    background-color: ${({ isExpanded }) =>
        isExpanded ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const PatternMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const TableDataStyled = styled(TableData)`
    position: relative;
    padding: 0px;
    padding-left: 44px;

    & > div > div {
        width: 100%;
    }

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

export const ExpandedContainer = styled.div`
    padding-left: 24px;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;
