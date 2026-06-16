import type { BadgeSemantic } from 'components/ui';

export enum FitnessFunctionStatus {
    TEST = 'TEST',
    TRIAL = 'TRIAL',
    ADOPT = 'ADOPT',
}

export const fitnessFunctionStatuses = Object.values(FitnessFunctionStatus);

export const fitnessFunctionStatusToNameMap: Record<FitnessFunctionStatus, string> = {
    [FitnessFunctionStatus.TEST]: 'Test',
    [FitnessFunctionStatus.TRIAL]: 'Trial',
    [FitnessFunctionStatus.ADOPT]: 'Adopt',
};

export const fitnessFunctionStatusToSemanticMap: Record<FitnessFunctionStatus, BadgeSemantic> = {
    [FitnessFunctionStatus.TEST]: 'info',
    [FitnessFunctionStatus.TRIAL]: 'warning',
    [FitnessFunctionStatus.ADOPT]: 'success',
};

export enum FitnessFunctionType {
    SCRIPT = 'SCRIPT',
    SYNC = 'SYNC',
    ASYNC = 'ASYNC',
}
export const fitnessFunctionTypeToNameMap: Record<FitnessFunctionType, string> = {
    [FitnessFunctionType.SCRIPT]: 'Script',
    [FitnessFunctionType.SYNC]: 'Синхронный метод',
    [FitnessFunctionType.ASYNC]: 'Асинхронный метод',
};
