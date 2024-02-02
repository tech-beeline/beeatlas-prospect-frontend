import styled from '@emotion/styled';

export const Container = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;

    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(320px)')};

    width: 320px;
    height: 100vh;

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    border-left: 1px solid var(--color-divider);

    z-index: 102;

    transition: transform 0.25s ease-out;
`;

export const Backdrop = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;

    width: 100%;
    height: 100%;

    z-index: 101;

    background-color: var(--color-background-backdrop);

    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;
