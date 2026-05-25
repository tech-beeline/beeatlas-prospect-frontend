export enum ChipVariants {
    FILE = 'FILE',
    INPUT = 'INPUT',
}

export const CHIPS = [
    {
        label: 'Ввести вручную',
        value: ChipVariants.INPUT,
    },
    {
        label: 'Загрузить файлом',
        value: ChipVariants.FILE,
    },
];
