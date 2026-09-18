import styled from '@emotion/styled';

export const Root = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    background: var(--color-background-base);
`;

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    gap: var(--size-spacing-x2);
    padding: 8px 16px;
    border-bottom: 1px solid var(--color-divider);
`;

/** Размеры полотна в мировых координатах — как `.diagram-dims` в прототипе. */
export const Dimmensions = styled.span`
    font-family: var(--font-family-code);
    font-size: 11px;
    color: var(--color-text-inactive);
    margin-left: var(--size-spacing-x2);
    white-space: nowrap;
`;

export const ZoomValue = styled.span`
    font-family: var(--font-family-code);
    font-size: 11px;
    color: var(--color-text-inactive);
    min-width: 42px;
    text-align: center;
`;

/** Полотно: перетаскивание и зум без прокрутки. */
export const Canvas = styled.div`
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    user-select: none;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`;

export const CanvasSvg = styled.svg`
    display: block;
    width: 100%;
    height: 100%;
`;

/** Подсказка про управление — в правом нижнем углу полотна. */
export const Hint = styled.span`
    position: absolute;
    right: 12px;
    bottom: 12px;
    font-size: 11px;
    color: var(--color-text-inactive);
    pointer-events: none;
`;
