import { AxiosPromise } from 'axios';

import { GATEWAY_DASHBOARD_SERVICE_URL, GATEWAY_STAGING_SEQUENCE_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';

import * as T from './types';

export const getStagingSequenceCjTree = (): AxiosPromise<T.IStagingSequenceCJ[]> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SEQUENCE_URL}api/v1/cj-tree`,
    });
};

export const getSequenceAlertById = (uid: string): AxiosPromise<T.IStagingSequenceAlert> => {
    return Api.get({
        url: `${GATEWAY_DASHBOARD_SERVICE_URL}api/v1/sequences/${uid}/dashboards/1`,
    });
};

export const postSequenceAlertById = (uid: string, data: T.IStagingSequenceAlertForm) => {
    return Api.post({
        url: `${GATEWAY_DASHBOARD_SERVICE_URL}api/v1/sequences/${uid}/dashboards/1`,
        data,
    });
};

export const getSequenceCallsById = (uid: string): AxiosPromise<T.IStagingSequenceCallsData> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SEQUENCE_URL}api/v1/bi-step-refs/${uid}/sequence`,
    });
};

export const getStagingSequenceBiSteps = (): AxiosPromise<T.IStagingSequenceBiStep[]> => {
    return Api.get({
        url: `${GATEWAY_STAGING_SEQUENCE_URL}api/v1/bi-step-refs`,
    });
};
