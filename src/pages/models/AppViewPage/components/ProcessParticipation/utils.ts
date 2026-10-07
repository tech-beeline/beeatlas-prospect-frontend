import { IParticipationRow } from './types';

const normalize = (value: string) => value.trim().toLocaleLowerCase('ru');

const includesSearch = (values: Array<string | null | undefined>, search: string) =>
    values.some((value) => !!value && normalize(value).includes(search));

export const filterParticipationRows = <T>(
    rows: IParticipationRow<T>[],
    search: string,
    methodValues: (method: T) => Array<string | null | undefined>,
): IParticipationRow<T>[] => {
    const normalizedSearch = normalize(search);
    if (!normalizedSearch) return rows;

    return rows.flatMap((row) => {
        if (includesSearch([row.title, row.code], normalizedSearch)) {
            return [{ ...row, expanded: true }];
        }
        const methods = row.methods.filter((method) =>
            includesSearch(methodValues(method), normalizedSearch),
        );
        return methods.length > 0 ? [{ ...row, methods, expanded: true }] : [];
    });
};
