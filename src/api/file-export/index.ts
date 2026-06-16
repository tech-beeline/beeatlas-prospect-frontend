import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getExportFiles = (): AxiosPromise<T.IExportFile[]> => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documents/export`,
    });
};

export const downloadExportFile = (id: string | number): AxiosPromise => {
    return Api.get({
        url: `${GATEWAY_URL}document/v1/documents/${id}`,
        responseType: 'blob',
    });
};

export const postExport = (variant: T.ExportVariant): AxiosPromise<T.IExportResponse> => {
    return Api.post({
        url: `${GATEWAY_URL}document/v1/export/${variant}`,
    });
};
