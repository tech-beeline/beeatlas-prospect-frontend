import styled from '@emotion/styled';

export const Panels = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 360px);
    align-items: start;
    gap: 24px;
`;

export const TreePanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    padding: 16px 8px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;
