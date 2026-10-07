import styled from '@emotion/styled';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ChipsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    overflow-x: auto;
`;

export const UsecaseLink = styled.div`
    padding: 12px 16px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

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
