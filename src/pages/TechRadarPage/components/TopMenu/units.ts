import { Chip } from '@beeline/design-system-react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    width: 100%;
`;

export const MenuButton = styled.button<{ isActive: boolean }>`
    padding: 7px 12px;

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    background-color: ${({ isActive }) => (isActive ? '#fdd835' : 'rgba(25, 28, 52, 0.1)')};

    border-radius: var(--size-border-radius-x15);

    transition: background-color 0.25s ease-in-out;

    @media (hover: hover) {
        &:hover {
            background-color: ${({ isActive }) => !isActive && 'rgba(253, 216, 53, 0.5)'};
        }
    }
`;

export const ChipStyled = styled(Chip)<{ active: boolean }>`
    ${({ active }) =>
        active &&
        css`
            & > p {
                color: ${theme.colors.textActiveNoTheme} !important;
            }
        `}
`;
