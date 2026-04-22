import styled from '@emotion/styled';

export const Root = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1;
    min-height: 0;
`;

export const Canvas = styled.canvas`
    width: 100%;
    height: 100%;
    cursor: grab;
`;

export const EmptyState = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 16px;
    pointer-events: none;
    color: #71717a;
    text-align: center;
`;

export const EmptyHint = styled.div`
    max-width: 520px;
`;
