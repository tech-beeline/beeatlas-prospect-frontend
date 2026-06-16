import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableBooleanParam, formatNullableStringParam } from 'utils/formatters';

import { GATEWAY_FF_URL } from '../const';

import * as T from './types';

export const getAllFitnessFunctions = (): AxiosPromise<T.IFitnessFunctionData[]> => {
    return Api.get({
        url: `${GATEWAY_FF_URL}v1/fitness-functions`,
    });
};

export const putFitnessFunction = (code: string, data: T.IFitnessFunctionForm) => {
    const formData = new FormData();

    formData.append('description', data.description);

    if (data.applicability !== undefined) {
        formData.append('applicability', data.applicability ?? '');
    }

    if (data.auxiliary_check !== undefined) {
        formData.append('auxiliary_check', data.auxiliary_check ?? '');
    }

    if (data.script !== undefined) {
        formData.append('script', data.script ?? '');
    }

    if (data.script_file) {
        formData.append('script_file', data.script_file);
    }

    if (data.method !== undefined) {
        formData.append('method', data.method ?? '');
    }

    if (data.method_synchronous !== undefined) {
        formData.append('method_synchronous', data.method_synchronous ?? '');
    }

    return Api.put({
        url: `${GATEWAY_FF_URL}v1/fitness-function/${code}`,
        data: formData,
    });
};

export const runFitnessFunction = (
    code: string,
    cmdb: string,
    docId?: string,
): AxiosPromise<T.IRunFitnessFunctionResult> => {
    return Api.post({
        url: `${GATEWAY_FF_URL}v1/run/${code}?${formatNullableStringParam('docId', docId)}`,
        data: {
            app: cmdb,
        },
    });
};

export const getCallResult = (callId: string): AxiosPromise<T.IRunFitnessFunctionResult> => {
    return Api.get({
        url: `${GATEWAY_FF_URL}v1/ff/call/${callId}`,
    });
};

export const postFitnessFunctionStatus = (code: string, status: string) => {
    return Api.post({
        url: `${GATEWAY_FF_URL}v1/fitness-function/${code}/status`,
        data: new URLSearchParams({ status }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const getProductFitnessFunctions = (
    cmdb: string,
    triggers?: boolean,
): AxiosPromise<T.IProductFitnessFunctionsCompleteData> => {
    return Api.get({
        url: `${GATEWAY_FF_URL}v1/product/${cmdb}/actual-results?${formatNullableBooleanParam(
            'auxiliary',
            triggers,
        )}`,
    });
};
