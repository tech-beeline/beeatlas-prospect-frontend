export enum StepVariants {
    GENERAL_INFO = 'GENERAL_INFO',
    DOCUMENTATION = 'DOCUMENTATION',
    RULES = 'RULES',
    DESCRIPTION = 'DESCRIPTION',
}

export const STEPS = [
    { id: StepVariants.GENERAL_INFO, label: 'Общая информация', index: 1 },
    { id: StepVariants.DOCUMENTATION, label: 'Документация', index: 2 },
    { id: StepVariants.RULES, label: 'Правило проверки', index: 3 },
    { id: StepVariants.DESCRIPTION, label: 'Описание архитектуры в structurize dsl', index: 4 },
];

export interface ISavedData {
    type?: number;
    name?: string;
    group?: number[];
    tech?: number[];
    documentationFile?: File;
    rule?: string;
    description?: string;
    descriptionFile?: File;
    dsl?: string;
}
