import styled from '@emotion/styled';

import { ProgressBar } from 'components/ui';

export const CellVisual = styled.div`
    grid-column: 1;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CellText = styled.span`
    grid-column: 2;

    padding-left: 8px;
    white-space: nowrap;
`;

export const ProgressBarStyled = styled(ProgressBar)<{ isExpanded: boolean; themeIsDark: boolean }>`
    & > svg > circle:last-child {
        ${({ isExpanded, themeIsDark }) =>
            isExpanded ? (themeIsDark ? 'fill: #262626;' : 'fill: #f3f3f5;') : ''}
    }
`;
