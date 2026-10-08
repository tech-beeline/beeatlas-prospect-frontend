import { IDashboardVersionStatus, IStagingSequenceAlert } from 'api/staging-sequence/types';
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

export interface IBuiltImplementation {
    source: AlertSource;
    implementation: IAlertImplementation;
}

export interface IAlertCardParams {
    source: AlertSource;
    selected: IAlertImplementation | null;
    data?: IStagingSequenceAlert;
    hasError: boolean;
}

export interface IDashboardCardParams {
    data?: IDashboardVersionStatus;
    hasError: boolean;
    built: IBuiltImplementation | null;
}
