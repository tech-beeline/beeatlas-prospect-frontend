import styled from '@emotion/styled';

export const Panel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const Field = styled.div`
    display: grid;
    grid-template-columns: 112px minmax(0, 1fr);
    gap: 16px;

    word-break: break-all;
`;
