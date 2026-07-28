import { AxiosPromise } from 'axios';

import { GATEWAY_CX_URL, GATEWAY_DASHBOARD_SERVICE_URL, GATEWAY_PRODUCT_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';

import * as T from './types';

export const getStagingSequenceCjTree = (): AxiosPromise<T.IStagingSequenceCJ[]> => {
    return Api.get({
        url: `${GATEWAY_CX_URL}cx/v1/cj/e2e`,
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

export const getSequenceCallsById = (code: string): AxiosPromise<T.IStagingSequenceCallsData> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/e2e/${code}`,
    });
};

export const getStagingSequenceBiSteps = (): AxiosPromise<T.IStagingSequenceBiStep[]> => {
    return Api.get({
        url: `${GATEWAY_PRODUCT_URL}v1/e2e`,
    });
};

export const getStagingSequenceBiStepByCode = (
    code: string,
): AxiosPromise<T.IStagingSequenceBiStepData> => {
    return Api.get({
        url: `${GATEWAY_CX_URL}cx/v1/bi-step/${code}`,
    });
};
