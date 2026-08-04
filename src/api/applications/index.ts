import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableStringParam } from 'utils/formatters';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getApplications = (): AxiosPromise<T.IApplication[]> => {
    return Api.get({
        url: `${GATEWAY_URL}camunda-process/v1/application/author`,
    });
};

export const getApplicationByBusinessKey = (key: string): AxiosPromise<T.IExtendedApplication> => {
    return Api.get({
        url: `${GATEWAY_URL}camunda-process/v1/application/${key}`,
    });
};

export const getApplicationByBusinessKeyOrId = (
    key: string | null,
    id: string | null,
): AxiosPromise<T.IExtendedApplication> => {
    return Api.get({
        url: `${GATEWAY_URL}camunda-process/v1/application?${formatNullableStringParam(
            'business-key',
            key,
        )}${formatNullableStringParam('id', id)}`,
    });
};

export const getApplicationEntityById = (id: number): AxiosPromise<T.IApplicationEntity> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/business/order/${id}`,
    });
};

export const getArchitectApplications = (): AxiosPromise<T.IApplication[]> => {
    return Api.get({
        url: `${GATEWAY_URL}camunda-process/v1/application/nobody`,
    });
};

export const getExecutorApplications = (): AxiosPromise<T.IApplication[]> => {
    return Api.get({
        url: `${GATEWAY_URL}camunda-process/v1/application/executor`,
    });
};

export const postBCApplication = (data: T.IBCApplicationForm) => {
    return Api.post({
        url: `${GATEWAY_URL}capability/v1/business/order`,
        data,
    });
};

export const patchBCApplication = (
    id: string | number,
    nextStatus: string,
    data?: T.IApplicationPatchForm,
) => {
    return Api.patch({
        url: `${GATEWAY_URL}camunda-process/v1/application/${id}/executor?${formatNullableStringParam(
            'next_status',
            nextStatus,
        )}`,
        data,
    });
};

export const patchBCApplicationStatus = (
    id: string | number,
    nextStatus: string,
    data?: Pick<T.IApplicationPatchForm, 'comment'>,
) => {
    return Api.patch({
        url: `${GATEWAY_URL}camunda-process/v1/application/${id}/change-status/${nextStatus}`,
        data,
    });
};

export const patchApplicationEntity = (
    id: string | number,
    nextStatus: string,
    data: T.IApplicationPatchForm,
) => {
    return Api.patch({
        url: `${GATEWAY_URL}capability/v1/business/order/${id}?statusAlias=${nextStatus}`,
        data,
    });
};
