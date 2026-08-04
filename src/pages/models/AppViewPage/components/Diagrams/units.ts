import styled from '@emotion/styled';

/** Кнопка сворачивания / разворачивания панели у края диаграммы */
export const PanelEdgeToggleButton = styled.button<{ $surface: 'leftPanel' | 'rightPanel' }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--size-spacing-x2);

    border: 1px solid var(--color-divider);
    box-sizing: border-box;

    background: var(--color-background-base);
    cursor: pointer;
    color: inherit;

    ${({ $surface }) =>
        $surface === 'leftPanel'
            ? `
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: var(--size-border-radius-x6);
        border-bottom-right-radius: var(--size-border-radius-x6);
        border-left: none;
    `
            : `
        border-top-left-radius: var(--size-border-radius-x6);
        border-bottom-left-radius: var(--size-border-radius-x6);
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
    `}

    &:hover {
        background: var(--color-background-base-hover);
    }
`;

export const Root = styled.div`
    display: flex;
    height: calc(100vh - 260px);
    min-height: 560px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
    background: var(--color-background-base);
`;

export const Main = styled.div`
    position: relative;
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    background: var(--color-background-base);
`;

export const CanvasWrap = styled.div`
    position: relative;
    flex: 1;
    min-height: 0;
`;

export const CanvasState = styled.div`
    padding: 16px;
`;
