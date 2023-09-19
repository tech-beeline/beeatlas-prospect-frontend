export const formatYesNo = (flag: boolean | undefined | null) => (Boolean(flag) ? 'Да' : 'Нет');

export const formatNullableString = (str: string | undefined | null) =>
    Boolean(str) ? String(str) : '—';
