import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

import * as T from './types';

export const getProfiles = (): AxiosPromise<T.IProfile[]> => {
    return Api.get({
        url: `${API_URL}auth/v1/user/find`,
    });
};

export const getRoles = () => {
    return Api.get({
        url: `${API_URL}auth/v1/roles`,
    });
};

export const postRole = (data: T.IRole) => {
    return Api.post({
        url: `${API_URL}auth/v1/roles`,
        data,
    });
};

export const patchRole = (data: T.IRole) => {
    return Api.patch({
        url: `${API_URL}auth/v1/roles`,
        data,
    });
};

export const getCurrentRole = (id: number) => {
    return Api.get({
        url: `${API_URL}auth/v1/roles/${id}`,
    });
};

export const deleteRole = (id: number) => {
    return Api.delete({
        url: `${API_URL}auth/v1/roles/${id}`,
    });
};

export const getRolePermission = (id: number) => {
    return Api.get({
        url: `${API_URL}auth/v1/roles/${id}/permissions`,
    });
};

export const putRolePermission = (id: number, data: T.IPermission[]) => {
    return Api.put({
        url: `${API_URL}auth/v1/roles/${id}/permissions`,
        data,
    });
};
