import styled from '@emotion/styled';

export const Panel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    height: 100%;
    min-height: 0;
    padding: 24px;

    overflow-y: auto;
    box-sizing: border-box;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
`;

export const Field = styled.div`
    display: grid;
    grid-template-columns: 112px minmax(0, 1fr);
    gap: 16px;

    word-break: break-all;
`;
