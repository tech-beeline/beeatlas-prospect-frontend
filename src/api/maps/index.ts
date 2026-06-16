import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getMapCriterias = (type?: 'tc' | 'bc' | null): AxiosPromise<T.IMapCriteria[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/criterias?filter=${type}`,
    });
};

export const putCriteria = (data: T.ICriteriaForm) => {
    return Api.put({
        url: `${GATEWAY_URL}capability/v1/criterias`,
        data,
    });
};

export const deleteCriteria = (id: string | number) => {
    return Api.delete({
        url: `${GATEWAY_URL}capability/v1/criterias/${id}`,
    });
};

export const getPersonalMaps = (): AxiosPromise<T.IPersonalMapData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/maps`,
    });
};

export const getPersonalMapById = (
    id: string | number,
): AxiosPromise<T.IPersonalMapСompleteData> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/maps/${id}`,
    });
};

export const getPersonalMapTypes = (): AxiosPromise<T.IPersonalMapType[]> => {
    return Api.get({
        url: `${GATEWAY_URL}capability/v1/capability/type`,
    });
};

export const postPersonalMap = (data: T.IPersonalMapForm) => {
    return Api.post({
        url: `${GATEWAY_URL}capability/v1/maps`,
        data,
    });
};

export const patchPersonalMap = (id: string | number, data: T.IPersonalMapUpdateForm) => {
    return Api.patch({
        url: `${GATEWAY_URL}capability/v1/maps/${id}`,
        data,
    });
};

export const patchPersonalMapGroups = (id: string | number, data: T.IPersonalMapGroupForm[]) => {
    return Api.patch({
        url: `${GATEWAY_URL}capability/v1/maps/groups/${id}`,
        data,
    });
};

export const deletePersonalMap = (id: string) => {
    return Api.delete({
        url: `${GATEWAY_URL}capability/v1/maps/${id}`,
    });
};
