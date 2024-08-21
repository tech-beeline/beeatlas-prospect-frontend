import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableNumberParam, formatNullableStringParam } from 'utils/formatters';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getNotifications = (
    params?: T.INotificationParams,
): AxiosPromise<T.INotification[]> => {
    const { beforeDate, afterDate, page, type } = params ?? {};
    return Api.get({
        url: `${GATEWAY_URL}notify/v1/notify?${formatNullableStringParam(
            'beforeDate',
            beforeDate,
        )}${formatNullableStringParam('afterDate', afterDate)}${formatNullableNumberParam(
            'page',
            page,
        )}${formatNullableStringParam('type', type)}`,
    });
};

export const patchNotifications = (ids: number[]) => {
    return Api.patch({
        url: `${GATEWAY_URL}notify/v1/notify?notifyType=web`,
        data: ids,
    });
};
