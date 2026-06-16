import styled from '@emotion/styled';

import { Label } from 'components/ui';

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

export const LabelStyled = styled(Label)`
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    padding: 0px !important;

    & > span {
        margin-right: 0px !important;
    }
`;
