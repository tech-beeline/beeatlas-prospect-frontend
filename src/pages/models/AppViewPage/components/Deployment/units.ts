import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x4);
`;

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    gap: var(--size-spacing-x3);
    flex-wrap: wrap;
    min-width: 0;
`;

/**
 * Холст занимает остаток высоты окна — как у диаграмм движка (`Diagrams/units.ts`),
 * только на строку селектора ниже: 316 = 260 (высота области диаграмм движка)
 * + 40 (селектор) + 16 (зазор между ними). `min-height` держит диаграмму читаемой
 * на низких экранах, где расчёт по `vh` дал бы полоску.
 */
export const CanvasContainer = styled.div`
    height: calc(100vh - 316px);
    min-height: 480px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
    background: var(--color-background-base);
`;

export const StateContainer = styled.div`
    margin-top: 64px;
`;
