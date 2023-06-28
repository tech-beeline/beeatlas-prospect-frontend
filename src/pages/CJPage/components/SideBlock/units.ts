import styled from '@emotion/styled';

import { theme } from 'styles';

export const Container = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;

    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(320px)')};

    width: 320px;
    height: 100%;
    padding: 84px 16px 20px;

    background-color: ${theme.colors.backgroundLow};

    border-left: 1px solid ${theme.colors.divider};

    z-index: 10;

    transition: transform 0.25s ease-out;
`;
