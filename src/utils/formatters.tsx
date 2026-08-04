import React from 'react';

export const formatYesNo = (flag: boolean | undefined | null) => (Boolean(flag) ? 'Да' : 'Нет');

export const formatNullableString = (str: string | undefined | null | number, fallback?: string) =>
    Boolean(str) ? String(str) : fallback ?? '—';

export const formatNullableNumber = (value: number | string | null | undefined) => {
    return value === null ? '—' : String(value);
};

export const formatNullableNumberArray = (value: number[] | null | undefined) => {
    if (!value || value.length === 0) return '—';

    return value.join(', ');
};

export const formatNullableNumberParam = (
    paramName: string,
    param: number | undefined | null,
): string => (typeof param === 'number' ? `&${paramName}=${param}` : '');

export const formatNullableStringParam = (
    paramName: string,
    param: string | undefined | null,
): string => (typeof param === 'string' ? `&${paramName}=${param}` : '');

export const formatNullableBooleanParam = (
    paramName: string,
    param: boolean | undefined | null,
): string => (typeof param === 'boolean' ? `&${paramName}=${String(param)}` : '');

export const formatDateToUTC = (date: string | null): string | null => (date ? date + 'Z' : null);

export const formatSize = (bytes: number, dp = 1) => {
    const thresh = 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' б';
    }

    const units = ['Кб', 'Мб', 'Гб', 'Тб'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
};

export const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part) =>
                part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part,
            )}
        </span>
    );
};
