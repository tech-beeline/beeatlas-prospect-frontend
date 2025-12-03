export enum SearchVariants {
    PRODUCT = 'PRODUCT',
    SERVER = 'SERVER',
}

export enum TabVariant {
    IN = 'IN',
    OUT = 'OUT',
}

export const TABS = [
    {
        id: TabVariant.IN,
        label: 'Входящие связи',
    },
    {
        id: TabVariant.OUT,
        label: 'Исходящие связи',
    },
];
