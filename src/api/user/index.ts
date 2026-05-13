import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL, GATEWAY_USER_URL } from '../const';

import * as T from './types';

export const getUserInfo = (): AxiosPromise<T.IUserInfo> => {
    return Api.get({
        url: `${GATEWAY_URL}auth/v1/user/login/info`,
    });
};

export const postUsersInfo = (data: T.IUsersForm[]): AxiosPromise<T.IUserCreateResponseData[]> => {
    return Api.post({
        url: `${GATEWAY_USER_URL}v1/users`,
        data,
    });
};
