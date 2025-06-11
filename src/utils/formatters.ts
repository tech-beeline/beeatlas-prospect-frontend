export const formatYesNo = (flag: boolean | undefined | null) => (Boolean(flag) ? 'Да' : 'Нет');

export const formatNullableString = (str: string | undefined | null) =>
    Boolean(str) ? String(str) : '—';

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
