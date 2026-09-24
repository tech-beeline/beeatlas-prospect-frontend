export enum TabVariants {
    CALLS = 'CALLS',
    RELATED_CJS = 'RELATED_CJS',
    HISTORY = 'HISTORY',
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
    // {
    //     id: TabVariants.HISTORY,
    //     label: 'История загрузок',
    // },
];
