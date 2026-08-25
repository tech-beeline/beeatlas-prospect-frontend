export enum InterfaceOptions {
    STRUCTURIZR = 'structurizr',
}

export enum FilterOptions {
    DELETED = 'DELETED',
    EMPTY = 'EMPTY',
}

export const FILTER_OPTIONS = [
    {
        id: FilterOptions.DELETED,
        value: 'Удаленные контейнеры, интерфейсы и методы',
    },
    { id: FilterOptions.EMPTY, value: 'Пустые интерфейсы' },
];
