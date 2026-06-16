export enum SearchVariants {
    PRODUCT = 'PRODUCT',
    SERVER = 'SERVER',
    ENDPOINT = 'ENDPOINT',
}

export enum TabVariant {
    IN = 'IN',
    OUT = 'OUT',
}

export enum OperationTypes {
    ARCH = 'ARCH',
    DISCOVERED = 'DISCOVERED',
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
