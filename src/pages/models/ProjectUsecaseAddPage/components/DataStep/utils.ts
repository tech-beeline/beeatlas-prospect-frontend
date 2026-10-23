export const matchesSearch = (values: string[], search: string) => {
    const normalizedSearch = search.trim().toLocaleLowerCase('ru');

    return values.some((value) => value.toLocaleLowerCase('ru').includes(normalizedSearch));
};
