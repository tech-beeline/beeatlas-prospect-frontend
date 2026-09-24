import styled from '@emotion/styled';

/**
 * Рамка узла развёртывания. Координаты и размеры задаются атрибутами — их считает
 * раскладка; здесь только краска, взятая из токенов портала.
 */
export const FrameBody = styled.rect`
    fill: var(--color-background-secondary);
    stroke: var(--color-border);
    stroke-width: 1.5;
    stroke-dasharray: 8 6;
`;

/** Пунктирная рамка окружения: это уровень над деревом, а не узел сети. */
export const EnvironmentBody = styled(FrameBody)`
    fill: var(--color-background-base);
`;

export const HeaderDivider = styled.line`
    stroke: var(--color-border);
    stroke-width: 1;
`;

export const TypeLabel = styled.text`
    font-family: var(--font-family-code);
    font-size: 10px;
    font-weight: bold;
`;

export const FrameName = styled.text`
    font-family: var(--font-family-code);
    font-size: 10px;
    fill: var(--color-text-active);
`;

export const AddressLine = styled.text`
    font-family: var(--font-family-code);
    font-size: 10px;
    fill: var(--color-text-inactive);
`;

/** Строка счётчиков схлопнутого узла: сколько скрыто внутри. */
export const CountsLine = styled.text`
    font-family: var(--font-family-code);
    font-size: 10px;
    fill: var(--color-text-inactive);
`;

export const ToggleGlyph = styled.text`
    font-family: var(--font-family-code);
    font-size: 10px;
    font-weight: bold;
`;
