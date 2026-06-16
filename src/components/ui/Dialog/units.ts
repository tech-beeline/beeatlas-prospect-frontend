import styled from '@emotion/styled';

export const ModalRoot = styled.div``;

export const DialogRoot = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
`;

export const DialogBackdrop = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.48);
`;
