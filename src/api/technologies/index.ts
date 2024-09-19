import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getAllTechnologies = (): AxiosPromise<T.ITech[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/tech`,
    });
};

export const getTechnologyCategories = (): AxiosPromise<T.ICategory[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/category`,
    });
};

export const deleteTechnologyById = (id: string | number) => {
    return Api.delete({
        url: `${GATEWAY_URL}techradar/v1/tech/${id}`,
    });
};

export const postTechnology = (data: Omit<T.ITechForm, 'id'>[]) => {
    return Api.post({
        url: `${GATEWAY_URL}techradar/v1/tech`,
        data,
    });
};

export const patchTechnology = (data: T.ITechForm[]) => {
    return Api.patch({
        url: `${GATEWAY_URL}techradar/v1/tech`,
        data,
    });
};

export const getSubscribedTechnologies = (): AxiosPromise<T.ISubscribedTechnologyData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/tech/subscribed`,
    });
};
