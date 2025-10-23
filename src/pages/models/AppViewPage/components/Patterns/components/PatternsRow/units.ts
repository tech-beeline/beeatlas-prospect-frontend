import { Chip, TableData } from '@beeline/design-system-react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ChipStyled = styled(Chip)<{ active: boolean }>`
    ${({ active }) =>
        active &&
        css`
            & > p {
                color: rgba(9, 11, 22, 0.94) !important;
            }
        `}
`;

export const TableDataStyled = styled(TableData)`
    & > div > div {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }
`;
