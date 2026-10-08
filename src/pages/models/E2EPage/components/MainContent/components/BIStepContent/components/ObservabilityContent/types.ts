import { IUsecaseByBiStepCode } from 'api/usecase/types';

import { AlertSource } from './const';

export interface IObservabilityContent {
    biStepCode: string;
    e2eCodes: string[];
    usecases: IUsecaseByBiStepCode[];
}

export interface IAlertImplementation {
    id: string;
    label: string;
    name: string;
}

export interface IAlertImplementations {
    [AlertSource.E2E]: IAlertImplementation[];
    [AlertSource.USE_CASE]: IAlertImplementation[];
}
