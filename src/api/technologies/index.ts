import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableBooleanParam } from 'utils/formatters';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getAllTechnologies = (actualTech?: boolean): AxiosPromise<T.ITech[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/tech?${formatNullableBooleanParam(
            'actualTech',
            actualTech,
        )}`,
    });
};

export const getTechnologyById = (id: string | number): AxiosPromise<T.ITech> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/tech/${id}`,
    });
};

export const getTechnologyCategories = (): AxiosPromise<T.ICategory[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/category`,
    });
};

export const getTechnologiesByCategoryId = (id: string | number): AxiosPromise<T.ITech[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/category/tech?id_category=${id}`,
    });
};

export const postTechnologyCategory = (data: T.ICategoryForm) => {
    return Api.post({
        url: `${GATEWAY_URL}techradar/v1/category`,
        data,
    });
};

export const deleteTechnologyCategory = (id: string | number) => {
    return Api.delete({
        url: `${GATEWAY_URL}techradar/v1/category/${id}`,
    });
};

export const patchTechnologyCategory = (id: string | number, data: T.ICategoryForm) => {
    return Api.patch({
        url: `${GATEWAY_URL}techradar/v1/category/${id}`,
        data,
    });
};

export const mergeTechnologyCategories = (data: T.IMergeCategoriesForm) => {
    return Api.put({
        url: `${GATEWAY_URL}techradar/v1/category/join`,
        data,
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

export const patchTechnology = (id: string | number, data: T.ITechForm) => {
    return Api.patch({
        url: `${GATEWAY_URL}techradar/v1/tech/${id}`,
        data,
    });
};

export const postTechnologyVersions = (
    technologyId: string | number,
    data: T.ITechVersionForm[],
) => {
    return Api.post({
        url: `${GATEWAY_URL}techradar/v1/tech/${technologyId}/version`,
        data,
    });
};

export const patchTechnologyVersions = (
    technologyId: string | number,
    versionId: string | number,
    data: T.ITechVersionForm,
) => {
    return Api.patch({
        url: `${GATEWAY_URL}techradar/v1/tech/${technologyId}/version/${versionId}`,
        data,
    });
};

export const deleteTechnologyVersionById = (
    technologyId: string | number,
    versionId: string | number,
) => {
    return Api.delete({
        url: `${GATEWAY_URL}techradar/v1/tech/${technologyId}/version/${versionId}`,
    });
};

export const getSubscribedTechnologies = (): AxiosPromise<T.ISubscribedTechnologyData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/tech/subscribed`,
    });
};
