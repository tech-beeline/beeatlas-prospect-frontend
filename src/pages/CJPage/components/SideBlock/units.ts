import styled from '@emotion/styled';

import { theme } from 'styles';

export const Container = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;

    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(320px)')};

    width: 320px;
    height: 100%;
    padding: 20px 16px;

    background-color: var(--color-background-base);

    border-left: 1px solid ${theme.colors.divider};

    z-index: 10;

    transition: transform 0.25s ease-out;
`;
