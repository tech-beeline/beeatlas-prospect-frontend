import { AxiosPromise } from 'axios';

import { GATEWAY_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';

import * as T from './types';

export const getPatterns = (): AxiosPromise<T.IPattern[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/patterns`,
    });
};

export const getPatternById = (id: string | number): AxiosPromise<T.IPattern> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/pattern/${id}`,
    });
};

export const postPattern = (data: T.IPatternForm) => {
    return Api.post({
        url: `${GATEWAY_URL}techradar/v1/pattern`,
        data,
    });
};

export const getPatternGroups = (): AxiosPromise<T.IPatternGroup[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/pattern/group`,
    });
};

export const getPatternGroupsTree = (): AxiosPromise<T.IPatternGroupTree[]> => {
    return Api.get({
        url: `${GATEWAY_URL}techradar/v1/pattern/group/tree`,
    });
};

export const postPatternGroup = (data: T.IPatternGroupForm) => {
    return Api.post({
        url: `${GATEWAY_URL}techradar/v1/pattern/group`,
        data,
    });
};

export const patchPatternGroup = (id: string | number, data: T.IPatternGroupForm) => {
    return Api.patch({
        url: `${GATEWAY_URL}techradar/v1/pattern/group/${id}`,
        data,
    });
};

export const deletePatternGroup = (id: string | number) => {
    return Api.delete({
        url: `${GATEWAY_URL}techradar/v1/pattern/group/${id}`,
    });
};
