import { IFitnessFunctionData } from 'api/fitness-functions/types';

import { FitnessFunctionType } from './const';

export const getFitnessFunctionType = (
    fitnessFunction: IFitnessFunctionData,
): FitnessFunctionType => {
    if (!!fitnessFunction.script) {
        return FitnessFunctionType.SCRIPT;
    }
    if (!!fitnessFunction.method && fitnessFunction.method_synchronous) {
        return FitnessFunctionType.SYNC;
    }
    return FitnessFunctionType.ASYNC;
};
