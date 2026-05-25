import {
    FitnessFunctionStatus,
    fitnessFunctionStatusToNameMap,
    FitnessFunctionType,
    fitnessFunctionTypeToNameMap,
} from 'features/fitness-functions';

export const fitnessFunctionTypeOptions = [
    {
        id: FitnessFunctionType.SCRIPT,
        value: fitnessFunctionTypeToNameMap[FitnessFunctionType.SCRIPT],
    },
    { id: FitnessFunctionType.SYNC, value: fitnessFunctionTypeToNameMap[FitnessFunctionType.SYNC] },
    {
        id: FitnessFunctionType.ASYNC,
        value: fitnessFunctionTypeToNameMap[FitnessFunctionType.ASYNC],
    },
];

export const fitnessFunctionStatusOptions = [
    {
        id: FitnessFunctionStatus.TEST,
        value: fitnessFunctionStatusToNameMap[FitnessFunctionStatus.TEST],
    },
    {
        id: FitnessFunctionStatus.TRIAL,
        value: fitnessFunctionStatusToNameMap[FitnessFunctionStatus.TRIAL],
    },
    {
        id: FitnessFunctionStatus.ADOPT,
        value: fitnessFunctionStatusToNameMap[FitnessFunctionStatus.ADOPT],
    },
];
