import {
    FitnessFunctionStatus,
    fitnessFunctionStatusToNameMap,
    FitnessFunctionType,
    fitnessFunctionTypeToNameMap,
} from 'features/fitness-functions';

export const fitnessFunctionTypeFormOptions = [
    { id: 1, value: fitnessFunctionTypeToNameMap[FitnessFunctionType.SCRIPT] },
    { id: 2, value: fitnessFunctionTypeToNameMap[FitnessFunctionType.SYNC] },
    { id: 3, value: fitnessFunctionTypeToNameMap[FitnessFunctionType.ASYNC] },
];

export const fitnessFunctionStatusFormOptions = [
    { id: 1, value: fitnessFunctionStatusToNameMap[FitnessFunctionStatus.TEST] },
    { id: 2, value: fitnessFunctionStatusToNameMap[FitnessFunctionStatus.TRIAL] },
    { id: 3, value: fitnessFunctionStatusToNameMap[FitnessFunctionStatus.ADOPT] },
];

export enum StepVariants {
    GENERAL_INFO = 'GENERAL_INFO',
    LOGIC = 'LOGIC',
    TEST = 'TEST',
}

export const STEPS = [
    { id: StepVariants.GENERAL_INFO, label: 'Общая информация', index: 1 },
    { id: StepVariants.LOGIC, label: 'Настройка логики', index: 2 },
    { id: StepVariants.TEST, label: 'Тестирование', index: 3 },
];
