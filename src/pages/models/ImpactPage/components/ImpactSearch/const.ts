export enum SearchVariants {
    SYSTEM = 'SYSTEM',
    // CONTAINER = 'CONTAINER',
    SERVER = 'SERVER',
}

export const CHIPS = [
    { value: SearchVariants.SYSTEM, label: 'Имя/Мнемоника приложения CMDB' },
    // { value: SearchVariants.CONTAINER, label: 'Контейнер' },
    { value: SearchVariants.SERVER, label: 'IP/Host сервера' },
];

export const searchVariantToPlaceholderMap: Record<SearchVariants, string> = {
    [SearchVariants.SYSTEM]: 'Имя/Мнемоника приложения CMDB',
    [SearchVariants.SERVER]: 'IP/Host сервера',
};
