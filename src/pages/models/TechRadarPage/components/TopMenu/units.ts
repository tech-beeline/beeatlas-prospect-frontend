import { Chip } from '@beeline/design-system-react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;

    gap: 8px;

    width: 100%;
`;

export const ChipStyled = styled(Chip)<{ active: boolean }>`
    ${({ active }) =>
        active &&
        css`
            & > p {
                color: rgba(9, 11, 22, 0.94) !important;
            }
        `}
`;
