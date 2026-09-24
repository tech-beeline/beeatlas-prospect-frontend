import styled from '@emotion/styled';

/**
 * Карточка экземпляра контейнера. Геометрия (координаты, размеры, радиусы) задаётся
 * атрибутами в разметке — её считает раскладка, — а здесь только краска: цвета
 * берутся из токенов портала, поэтому тёмная тема переключается сама.
 */
export const CardBody = styled.rect`
    fill: var(--color-background-base);
    stroke-width: 1;
`;

/** Кольцо выбора: ореол и само кольцо — два штриха вместо фильтра свечения. */
export const SelectionHalo = styled.rect`
    fill: none;
    stroke-opacity: 0.18;
`;

export const SelectionRing = styled.rect`
    fill: none;
    stroke-width: 2;
`;

/** Цветной акцент типа — короткая скруглённая полоса у левого края. */
export const CardAccent = styled.rect``;

export const CardName = styled.text`
    font-family: var(--font-family-code);
    font-size: 12px;
    font-weight: 600;
    fill: var(--color-text-active);
`;

export const CardSubtitle = styled.text`
    font-family: var(--font-family-code);
    font-size: 10px;
    fill: var(--color-text-inactive);
`;

/** Строка url — третья строка карточки: метка «ссылка есть», полная в подсказке. */
export const CardUrl = styled.text`
    font-family: var(--font-family-code);
    font-size: 10px;
    fill: var(--color-text-inactive);
`;

/** Значок «×N»: заливка отличается от строк карточки — это не текст, а счётчик. */
export const CardBadge = styled.text`
    font-family: var(--font-family-code);
    font-size: 10px;
    fill: var(--color-text-inactive);
    opacity: 0.85;
`;
