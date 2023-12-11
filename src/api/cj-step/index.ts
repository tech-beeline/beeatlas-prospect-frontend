import { AxiosPromise } from 'axios';

import { IBIData } from 'api/bi/types';
import { ICJStepData, ICJStepForm } from 'api/cj/types';
import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

import * as T from './types';

export const getCJStepById = (cjId: string, stepId: string): AxiosPromise<ICJStepData> => {
    return Api.get({
        url: `${API_URL}cx/v1/product/cj/${cjId}/step/${stepId}`,
    });
};

export const getCJStepCollection = (cjId: string): AxiosPromise<ICJStepData[]> => {
    return Api.get({
        url: `${API_URL}cx/v1/product/cj/${cjId}/step`,
    });
};

export const postCJStep = (cjId: string, data: ICJStepForm) => {
    return Api.post({
        url: `${API_URL}cx/v1/product/cj/${cjId}/step`,
        data,
    });
};

export const patchCJStep = (stepId: string, data: ICJStepForm) => {
    return Api.patch({
        url: `${API_URL}cx/v1/product/cj/step/${stepId}`,
        data,
    });
};

export const deleteCJStep = (stepId: string) => {
    return Api.delete({
        url: `${API_URL}cx/v1/product/cj/step/${stepId}`,
    });
};

export const getCJStepBIs = (stepId: string): AxiosPromise<IBIData[]> => {
    return Api.get({
        url: `${API_URL}cx/v1/product/cj/step/${stepId}/bi`,
    });
};

export const putCJStepBIs = (stepId: string, data: T.ICJStepBIForm) => {
    return Api.put({
        url: `${API_URL}cx/v1/product/cj/step/${stepId}/bi`,
        data,
    });
};

export const deleteCJStepBI = (stepId: string, biId: string) => {
    return Api.delete({
        url: `${API_URL}cx/v1/product/step/${stepId}/bi/${biId}`,
    });
};
