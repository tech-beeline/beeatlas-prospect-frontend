import { AxiosPromise } from 'axios';

import { IBIData } from 'api/bi/types';
import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

import * as T from './types';

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
