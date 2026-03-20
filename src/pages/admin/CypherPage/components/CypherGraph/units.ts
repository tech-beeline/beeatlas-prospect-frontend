import styled from '@emotion/styled';

import { PANEL_RESIZE_HANDLE_WIDTH } from './const';

export const GraphLayout = styled.div`
    width: 100%;
`;

export const GraphRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: var(--size-spacing-x3);
    height: 70vh;
`;

export const GraphLeftColumn = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-self: stretch;
    gap: var(--size-spacing-x3);
    min-width: 0;
    min-height: 0;
`;

export const CanvasArea = styled.div`
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: var(--color-background-base);
    border: 1px solid var(--color-border);
    border-radius: var(--size-border-radius-x6);
`;

export const Legend = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--size-spacing-x4);
    box-sizing: border-box;
    width: 100%;
    padding: var(--size-spacing-x4);
    border: 1px solid var(--color-border);
    border-radius: var(--size-border-radius-x6);
    background: var(--color-background-base);
`;

export const LegendItem = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 1.25;
    color: var(--color-text-primary);

    &::before {
        content: '';
        width: 10px;
        height: 10px;
        flex-shrink: 0;
        border-radius: 50%;
        background: var(--legend-color, #666);
    }
`;

export const EmptyHint = styled.p`
    flex: 1;
    margin: 0;
    padding: 24px;
    text-align: center;
    color: var(--color-text-secondary);
`;

export const PaneResizeHandle = styled.button`
    flex-shrink: 0;
    align-self: stretch;
    width: ${PANEL_RESIZE_HANDLE_WIDTH}px;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 2px;
    background: var(--color-border);
    cursor: col-resize;
    touch-action: none;

    &:focus-visible {
        outline: 2px solid var(--color-focus, var(--color-border));
        outline-offset: -1px;
    }
`;
