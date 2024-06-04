import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import { ICategory, ITech, ITechForm } from './types';

export const getAllTechnologies = (): AxiosPromise<ITech[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/tech`,
    });
};

export const getTechnologyCategories = (): AxiosPromise<ICategory[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/category`,
    });
};

export const deleteTechnologyById = (id: string | number) => {
    return Api.delete({
        url: `${GATEWAY_URL}techradar/v1/tech/${id}`,
    });
};

export const postTechnology = (data: Omit<ITechForm, 'id'>[]) => {
    return Api.post({
        url: `${GATEWAY_URL}techradar/v1/tech`,
        data,
    });
};

export const patchTechnology = (data: ITechForm[]) => {
    return Api.patch({
        url: `${GATEWAY_URL}techradar/v1/tech`,
        data,
    });
};
