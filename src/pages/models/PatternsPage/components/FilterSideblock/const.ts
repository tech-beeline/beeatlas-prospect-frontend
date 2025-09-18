export enum SideblockView {
    FILTER = 'FILTER',
    FORM = 'FORM',
}

export interface IFilterElementWithChildren {
    label: string;
    children: IFilterElementWithChildren[];
}

export const FILTER_ELEMENTS: IFilterElementWithChildren[] = [
    {
        label: 'А',
        children: [
            {
                label: 'Data products',
                children: [
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                ],
            },
        ],
    },
    {
        label: 'Архитектурный каталог Beeline',
        children: [
            {
                label: 'Data products',
                children: [
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                ],
            },
        ],
    },
    {
        label: 'Архитектурный каталог Beeline',
        children: [
            { label: 'Data products', children: [{ label: 'Витрина данных', children: [] }] },
        ],
    },
    {
        label: 'Архитектурный каталог Beeline',
        children: [
            { label: 'Data products', children: [{ label: 'Витрина данных', children: [] }] },
        ],
    },
    {
        label: 'Архитектурный каталог Beeline',
        children: [
            {
                label: 'Data products',
                children: [
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                    { label: 'Витрина данных', children: [] },
                ],
            },
        ],
    },
];
