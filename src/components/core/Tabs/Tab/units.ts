import styled from '@emotion/styled';

import { theme } from 'styles';

export const Tab = styled.button<{ isActive: boolean }>`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-subtitle3);
    letter-spacing: var(--font-letter-spacing-body3);

    color: ${({ isActive }) => (isActive ? theme.colors.textActive : theme.colors.textInactive)};

    &::after {
        position: absolute;
        bottom: 0;
        content: '';

        height: 4px;
        width: 100%;

        border-radius: 3px 3px 0px 0px;

        background-color: ${({ isActive }) =>
            isActive ? theme.colors.brandYellow : 'transparent'};

        transition: background-color 0.25s ease-out;
    }
`;
