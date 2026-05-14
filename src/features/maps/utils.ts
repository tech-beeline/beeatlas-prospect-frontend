import { IMapCriteria } from 'api/maps/types';

import {
    END_COLOR_DARK,
    END_COLOR_LIGHT,
    START_COLOR_DARK,
    START_COLOR_LIGHT,
} from './components/DynamicLegend/const';

export const generateColorGradient = (color1: string, color2: string, steps: number) => {
    // Удаляем # из шестнадцатеричных кодов, если они есть
    color1 = color1.replace('#', '');
    color2 = color2.replace('#', '');

    // Парсим шестнадцатеричные значения в RGB
    const r1 = parseInt(color1.substring(0, 2), 16);
    const g1 = parseInt(color1.substring(2, 4), 16);
    const b1 = parseInt(color1.substring(4, 6), 16);
    const r2 = parseInt(color2.substring(0, 2), 16);
    const g2 = parseInt(color2.substring(2, 4), 16);
    const b2 = parseInt(color2.substring(4, 6), 16);

    // Массив для хранения цветов градиента
    const gradient = [];

    // Генерируем цвета для каждого шага
    for (let i = 0; i < steps; i++) {
        // Вычисляем долю для интерполяции
        const ratio = i / (steps - 1);

        // Линейная интерполяция для каждого канала RGB
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);

        // Преобразуем обратно в шестнадцатеричный формат
        const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
            .toString(16)
            .padStart(2, '0')}`;
        gradient.push(hexColor);
    }

    return gradient;
};

export const generateMapColorGradient = (
    themeIsDark: boolean,
    reverse: boolean,
    interval: number,
    threshold: number | null,
) => {
    const lightColors = [START_COLOR_LIGHT, END_COLOR_LIGHT];
    const darkColors = [START_COLOR_DARK, END_COLOR_DARK];

    return generateColorGradient(
        themeIsDark ? darkColors[reverse ? 1 : 0] : lightColors[reverse ? 1 : 0],
        themeIsDark ? darkColors[reverse ? 0 : 1] : lightColors[reverse ? 0 : 1],
        threshold ? Math.floor(interval / threshold) : interval,
    );
};

export const selectColorByCriteria = (
    gradient: string[],
    selectedCriteria: IMapCriteria,
    grade: number,
    value: number,
): string => {
    if (selectedCriteria.threshold === null)
        return grade >= gradient.length ? gradient[gradient.length - 1] : gradient[grade];
    if (value > (selectedCriteria.interval ?? 1)) return gradient[gradient.length - 1];
    if (value === 0) return gradient[0];
    return gradient[Math.floor((value - 1) / selectedCriteria.threshold)];
};
