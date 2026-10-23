import { IParticipationRow, IParticipationSearchOption } from './types';

export const getParticipationSearchOptions = <T>(
    rows: IParticipationRow<T>[],
    search: string,
    methodValues: (method: T) => Array<string | null | undefined>,
): IParticipationSearchOption[] => {
    const normalizedSearch = search.trim().toLocaleLowerCase('ru');
    const options = rows.flatMap((row) => [
        {
            value: row.title,
            code: row.code,
            searchValue: `${row.title} ${row.code}`,
            rowKey: row.key,
        },
        ...row.methods.map((method, methodIndex) => ({
            value: methodValues(method)[0] || '',
            code: row.code,
            searchValue: [...methodValues(method), row.title, row.code].filter(Boolean).join(' '),
            rowKey: row.key,
            methodIndex,
        })),
    ]);
    return options
        .map((option, id) => ({ ...option, id }))
        .filter((option) => option.searchValue.toLocaleLowerCase('ru').includes(normalizedSearch));
};
