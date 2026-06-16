export enum TabVariants {
    CALLS = 'CALLS',
    RELATED_CJS = 'RELATED_CJS',
}

export const TABS = [
    {
        id: TabVariants.CALLS,
        label: 'Последовательность вызовов',
    },
    {
        id: TabVariants.RELATED_CJS,
        label: 'Связанные CJ',
    },
];
