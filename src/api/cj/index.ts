import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { API_URL, MOCK_PRODUCT_ID } from '../const';

import * as T from './types';

export const getAllCJs = (search: string): AxiosPromise<T.ICJData[]> => {
    return Api.get({
        url: `${API_URL}cx/v1/product/cj?sample=ALL&search=${search}`,
    });
};

export const getCJById = (id: string): AxiosPromise<T.ICompleteCJData> => {
    return Api.get({
        url: `${API_URL}cx/v1/product/cj/${id}`,
    });
};

export const postCJ = (data: T.ICJForm) => {
    return Api.post({
        url: `${API_URL}cx/v1/product/${MOCK_PRODUCT_ID}/cj`,
        data,
    });
};

export const patchCJ = (id: string, data: T.ICJForm) => {
    return Api.patch({
        url: `${API_URL}cx/v1/product/cj/${id}`,
        data,
    });
};

export const deleteCJ = (id: string) => {
    return Api.delete({
        url: `${API_URL}cx/v1/product/cj/${id}`,
    });
};

export const getCJsByBIId = (biId: string): AxiosPromise<T.ICJData[]> => {
    return Api.get({
        url: `${API_URL}cx/v1/product/cj/step/bi/${biId}`,
    });
};
