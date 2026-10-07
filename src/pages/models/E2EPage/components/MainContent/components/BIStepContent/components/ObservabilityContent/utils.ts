import { IUsecaseByBiStepCode } from 'api/usecase/types';

import { AlertSource } from './const';
import { IAlertImplementations } from './types';

export const getAlertImplementations = (
    e2eCodes: string[],
    usecases: IUsecaseByBiStepCode[],
): IAlertImplementations => ({
    [AlertSource.E2E]: e2eCodes.map((code) => ({ id: code, label: code, name: code })),
    [AlertSource.USE_CASE]: usecases.map(({ id, code, name }) => ({
        id: String(id),
        label: code,
        name,
    })),
});

export const getAvailableAlertSources = (implementations: IAlertImplementations) =>
    Object.values(AlertSource).filter((source) => implementations[source].length > 0);
