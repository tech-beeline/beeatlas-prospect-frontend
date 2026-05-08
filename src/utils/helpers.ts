import { NavigateFunction } from 'react-router-dom';

export const capitalizeFirstLetter = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

// 1 год, 2 года, 5 лет
export const pluralize = (variants: [string, string, string], n: number) => {
    if (n === 11) return variants[2];
    const lastDigit = n % 10;
    if (lastDigit === 1) return variants[0];
    if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) return variants[1];
    return variants[2];
};

export const prettifyJSONString = (json: string) => {
    try {
        return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
        return json;
    }
};

export const downloadTextFile = (filename: string, text: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

export const isNotNull = <T>(v: T | null): v is T => v !== null;

export const safeNavigateBack = (navigate: NavigateFunction, fallback: string) => {
    const idx = (window.history.state as { idx?: number } | null)?.idx;
    if (typeof idx === 'number' && idx > 0) {
        navigate(-1);
        return;
    }
    navigate(fallback);
};
