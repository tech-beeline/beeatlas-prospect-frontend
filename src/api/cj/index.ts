import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableNumberParam } from 'utils/formatters';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getAllCJs = (
    search: string,
    sample: T.CJLibraryStatus,
    productId?: number,
): AxiosPromise<T.ICJNewData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v1/cj?sample=${sample}&search=${search}${formatNullableNumberParam(
            'idProduct',
            productId,
        )}`,
    });
};

export const getCJById = (id: string): AxiosPromise<T.ICompleteCJData> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v2/cj/${id}`,
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
