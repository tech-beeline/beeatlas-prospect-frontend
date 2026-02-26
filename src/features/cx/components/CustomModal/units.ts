import styled from '@emotion/styled';

export const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: #191c343d;
    z-index: 1000;
`;

export const ModalWrapper = styled.div`
    position: fixed;

    top: 80px;
    bottom: 80px;
    left: 160px;
    right: 160px;

    display: flex;
    flex-direction: column;

    max-width: calc(100vw - 320px);
    max-height: calc(100vh - 160px);
    width: 100%;
    height: 100%;
    background: var(--color-background-base);
    border-radius: 12px;

    overflow: hidden;
`;
