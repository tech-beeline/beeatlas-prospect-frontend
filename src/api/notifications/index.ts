import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getNotifications = (): AxiosPromise<T.INotification[]> => {
    return Api.get({
        url: `${GATEWAY_URL}notifications/v1/notify`,
    });
};

export const patchNotifications = (ids: number[]) => {
    return Api.patch({
        url: `${GATEWAY_URL}notifications/v1/notify?notifyType=web_notify`,
        data: ids,
    });
};
