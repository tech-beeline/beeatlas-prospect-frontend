import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

import * as T from './types';

export const getBIById = (id: string): AxiosPromise<T.IBIData> => {
    return Api.get({
        url: `${API_URL}cx/v1/library/business-interactions/${id}`,
    });
};

export const getBICollection = (search?: string): AxiosPromise<T.IBIData[]> => {
    return Api.get({
        url: `${API_URL}cx/v1/library/business-interactions/find?text=${search}`,
    });
};

export const postBI = (data: T.IBIForm) => {
    return Api.post({
        url: `${API_URL}cx/v1/library/business-interactions`,
        data,
    });
};

export const putBI = (id: string, data: T.IBIForm) => {
    return Api.put({
        url: `${API_URL}cx/v1/library/business-interactions/${id}`,
        data,
    });
};

export const deleteBI = (id: string) => {
    return Api.delete({
        url: `${API_URL}cx/v1/library/business-interactions/${id}`,
    });
};
