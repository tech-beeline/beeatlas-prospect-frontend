export enum SearchVariants {
    APP = 'APP',
    INSTANCE = 'INSTANCE',
    SERVICE = 'SERVICE',
    ENDPOINT = 'ENDPOINT',
    SERVER = 'SERVER',
}

export const CHIPS = [
    { value: SearchVariants.APP, label: 'Имя/Мнемоника приложения CMDB' },
    { value: SearchVariants.INSTANCE, label: 'Мнемоника экземпляра CMDB' },
    { value: SearchVariants.SERVICE, label: 'Имя сервиса' },
    { value: SearchVariants.ENDPOINT, label: 'Имя endpoint' },
    { value: SearchVariants.SERVER, label: 'Имя сервера' },
];
