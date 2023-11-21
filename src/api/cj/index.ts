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

export const putCJ = (id: string, data: T.ICJForm) => {
    return Api.put({
        url: `${API_URL}cx/v1/product/cj/${id}`,
        data,
    });
};

export const deleteCJ = (id: string) => {
    return Api.delete({
        url: `${API_URL}cx/v1/product/cj/${id}`,
    });
};

export const getCJStepById = (cjId: string, stepId: string): AxiosPromise<T.ICJStepData> => {
    return Api.get({
        url: `${API_URL}cx/v1/product/cj/${cjId}/step/${stepId}`,
    });
};

export const getCJStepCollection = (cjId: string): AxiosPromise<T.ICJStepData[]> => {
    return Api.get({
        url: `${API_URL}cx/v1/product/cj/${cjId}/step`,
    });
};

export const postCJStep = (cjId: string, data: T.ICJStepForm) => {
    return Api.post({
        url: `${API_URL}cx/v1/product/cj/${cjId}/step`,
        data,
    });
};

export const putCJStep = (cjId: string, stepId: string, data: T.ICJStepForm) => {
    return Api.put({
        url: `${API_URL}cx/v1/product/cj/step/${stepId}`,
        data,
    });
};

export const deleteCJStep = (cjId: string, stepId: string) => {
    return Api.delete({
        url: `${API_URL}cx/v1/product/cj/step/${stepId}`,
    });
};
