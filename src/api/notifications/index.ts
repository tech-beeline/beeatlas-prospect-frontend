import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import {
    formatNullableBooleanParam,
    formatNullableNumberParam,
    formatNullableStringParam,
} from 'utils/formatters';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getNotifications = (
    params?: T.INotificationParams,
): AxiosPromise<T.INotificationData> => {
    const { beforeDate, afterDate, page, type, wasNotify } = params ?? {};
    return Api.get({
        url: `${GATEWAY_URL}notify/v1/notify?${formatNullableStringParam(
            'beforeDate',
            beforeDate,
        )}${formatNullableStringParam('afterDate', afterDate)}${formatNullableNumberParam(
            'page',
            page,
        )}${formatNullableStringParam('type', type)}${formatNullableBooleanParam(
            'wasNotify',
            wasNotify,
        )}`,
    });
};

export const patchNotifications = (ids: number[]) => {
    return Api.patch({
        url: `${GATEWAY_URL}notify/v1/notify?notifyType=web`,
        data: ids,
    });
};
