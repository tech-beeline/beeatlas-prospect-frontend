import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableNumberParam } from 'utils/formatters';

import { GATEWAY_CX_URL, GATEWAY_OBS_DASHBOARD_URL, GATEWAY_URL } from '../const';

import * as T from './types';

export const getAllCJs = (
    search: string,
    sample: T.CJLibraryStatus,
    productId?: number,
): AxiosPromise<T.ICJNewData[]> => {
    return Api.get({
        url: `${GATEWAY_CX_URL}cx/v2/product/cj?sample=${sample}&search=${search}${formatNullableNumberParam(
            'product-id',
            productId,
        )}`,
    });
};

export const getCJById = (id: string): AxiosPromise<T.ICompleteCJData> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v2/cj/${id}`,
    });
};

export const getCJByIdV1 = (id: string): AxiosPromise<T.ICompleteCJData> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v1/cj/${id}`,
    });
};

export const postCJByBPMN = (id: string): AxiosPromise<T.ICompleteCJData> => {
    return Api.patch({
        url: `${GATEWAY_URL}cx/v1/bpmn/cj/${id}`,
    });
};

export const postCJ = (data: T.ICJForm, productId: number) => {
    return Api.post({
        url: `${GATEWAY_URL}cx/v1/product/${productId}/cj`,
        data,
    });
};

export const putCJ = (id: string, data: Partial<T.ICJForm>) => {
    return Api.put({
        url: `${GATEWAY_URL}cx/v1/cj/${id}`,
        data,
    });
};

export const patchCJ = (id: string, data: Partial<T.ICJForm>) => {
    return Api.patch({
        url: `${GATEWAY_URL}cx/v1/cj/${id}`,
        data,
    });
};

export const deleteCJ = (id: string) => {
    return Api.delete({
        url: `${GATEWAY_URL}cx/v1/cj/${id}`,
    });
};

export const getCJsByBIId = (biId: string): AxiosPromise<T.ICJData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v1/product/cj/step/bi/${biId}`,
    });
};

export const uploadBPMNFile = (file: File, cjId: string) => {
    const formData = new FormData();
    formData.append('file', file);

    return Api.post({
        url: `${GATEWAY_URL}document/v1/documents/CJ_BPMN/bpmn?targetId=${cjId}&isPublic=true`,
        data: formData,
        headers: {
            'Content-Disposition': `${encodeURI(file.name)}`,
        },
    });
};

export const getCJDocumentationTypes = (): AxiosPromise<T.ICJDocumentTypesData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documentations/CJ`,
    });
};

export const getBPMNFile = (cjId: number, docTypeId: number): AxiosPromise<string> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documents/${docTypeId}/${cjId}`,
    });
};

export const getBPMNFileData = (id: number): AxiosPromise<string> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documents/${id}`,
    });
};

export const getBPMNFileVersion = (
    cjId: number,
    docTypeId: number,
): AxiosPromise<T.IBPMNFileVersion[]> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documents/versions/${docTypeId}/${cjId}`,
    });
};

export const putCjDashboard = (cjId: number): AxiosPromise<T.IDashboardData> => {
    return Api.put({
        url: `${GATEWAY_OBS_DASHBOARD_URL}v1/dashboard-cj/${cjId}`,
    });
};

export const patchCJLink = (id: string, data: Partial<T.ICJForm>) => {
    return Api.patch({
        url: `${GATEWAY_CX_URL}v1/cj/${id}`,
        data,
    });
};

export const getCJsByTechCapabilityId = (techCapabilityId: string): AxiosPromise<T.ICJData[]> => {
    return Api.get({
        url: `${GATEWAY_CX_URL}cx/v1/tech-capability/${techCapabilityId}/cj`,
    });
};
