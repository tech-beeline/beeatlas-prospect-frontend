import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL, GATEWAY_USER_URL } from '../const';

import * as T from './types';

export const getProfiles = (): AxiosPromise<T.IProfile[]> => {
    return Api.get({
        url: `${GATEWAY_URL}auth/v1/user`,
    });
};

export const getProfileRoles = (login: string): AxiosPromise<T.IRole[]> => {
    return Api.get({ url: `${GATEWAY_URL}auth/v1/user/${login}/roles` });
};

export const putProfileRoles = (login: string, data: { id: number }[]) => {
    return Api.put({ url: `${GATEWAY_URL}auth/v1/user/${login}/roles`, data });
};

export const getRoles = (): AxiosPromise<T.IRole[]> => {
    return Api.get({
        url: `${GATEWAY_URL}auth/v1/roles`,
    });
};

export const postRole = (data: T.IRole) => {
    return Api.post({
        url: `${GATEWAY_URL}auth/v1/roles`,
        data,
    });
};

export const patchRole = (data: T.IRole) => {
    return Api.patch({
        url: `${GATEWAY_URL}auth/v1/roles`,
        data,
    });
};

export const getRoleById = (id: number) => {
    return Api.get({
        url: `${GATEWAY_URL}auth/v1/roles/${id}`,
    });
};

export const deleteRole = (id: number) => {
    return Api.delete({
        url: `${GATEWAY_URL}auth/v1/roles/${id}`,
    });
};

export const getRolePermission = (id: number) => {
    return Api.get({
        url: `${GATEWAY_URL}auth/v1/roles/${id}/permissions`,
    });
};

export const putRolePermission = (id: number, data: T.IPermission[]) => {
    return Api.put({
        url: `${GATEWAY_URL}auth/v1/roles/${id}/permissions`,
        data,
    });
};

export const getEmployee = (query: string): AxiosPromise<T.IBusinessOwner[]> => {
    return Api.get({
        url: `${GATEWAY_USER_URL}v1/users/myprofile`,
        params: {
            search: query,
        },
    });
};

export const postEmployee = (data: T.IBusinessOwnerForm): AxiosPromise<T.IBusinessOwner[]> => {
    return Api.post({
        url: `${GATEWAY_URL}auth/v1/users`,
        data,
    });
};
