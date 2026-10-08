import { IDashboardVersionStatus } from 'api/staging-sequence/types';
import { IUsecaseByBiStepCode } from 'api/usecase/types';

import { AlertSource, PublishTarget } from './const';

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

export interface IPublishCardParams {
    target: PublishTarget;
    data?: IDashboardVersionStatus;
    hasError: boolean;
    built: IBuiltImplementation | null;
}
