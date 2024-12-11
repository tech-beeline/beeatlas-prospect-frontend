import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getUserInfo = (): AxiosPromise<T.IUserInfo> => {
    return Api.get({
        url: `${GATEWAY_URL}auth/v1/user/login/info`,
    });
};
