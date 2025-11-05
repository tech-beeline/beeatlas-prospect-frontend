export enum SearchVariants {
    SYSTEM = 'SYSTEM',
    CONTAINER = 'CONTAINER',
    SERVER = 'SERVER',
}

export const CHIPS = [
    { value: SearchVariants.SYSTEM, label: 'Система' },
    // { value: SearchVariants.CONTAINER, label: 'Контейнер' },
    { value: SearchVariants.SERVER, label: 'Сервер' },
];
