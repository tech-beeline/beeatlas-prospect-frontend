import styled from '@emotion/styled';

export const Panels = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 360px);
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
    gap: 24px;

    flex: 1;
    min-height: 0;
    overflow: hidden;
`;

export const TreePanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    min-height: 0;
    padding: 16px 8px;

    overflow-y: auto;
    box-sizing: border-box;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;
