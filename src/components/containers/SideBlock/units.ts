import styled from '@emotion/styled';

export const ContainerFixed = styled.div<{ isOpen: boolean; large: boolean }>`
    position: fixed;
    top: 0;
    right: 0;

    transform: ${({ isOpen, large }) =>
        isOpen ? 'translateX(0)' : large ? 'translateX(400px)' : 'translateX(320px)'};

    width: ${({ large }) => (large ? '400px' : '320px')};
    height: 100vh;

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    border-left: 1px solid var(--color-divider);

    z-index: 102;

    transition: transform 0.25s ease-out;
`;

export const ContainerBlock = styled.div<{ isOpen: boolean }>`
    height: calc(100vh - 64px);
    width: ${({ isOpen }) => (isOpen ? '320px' : '0px')};

    flex-grow: 1;

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    border-left: 1px solid var(--color-divider);

    z-index: 4;

    text-overflow: clip;

    transition: width 0.25s ease-out;
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
