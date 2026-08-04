import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';
import { formatNullableBooleanParam, formatNullableStringParam } from 'utils/formatters';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const postSubscription = (params: T.ISubscriptionForm) => {
    return Api.post({
        url: `${GATEWAY_URL}notify/v1/subscribe/${params.entityType}/${
            params.id
        }?${formatNullableBooleanParam(
            'sub-children',
            params.subChildren,
        )}${formatNullableStringParam('name', params.name)}`,
    });
};

export const deleteSubscription = (params: T.ISubscriptionForm) => {
    return Api.delete({
        url: `${GATEWAY_URL}notify/v1/subscribe/${params.entityType}/${params.id}`,
    });
};

export const getSubscriptions = (): AxiosPromise<T.ISubscriptionV2[]> => {
    return Api.get({
        url: `${GATEWAY_URL}notify/v1/subscribe`,
    });
};

export const getSubscriptionEntityTypes = (): AxiosPromise<T.ISubscriptionEntity[]> => {
    return Api.get({
        url: `${GATEWAY_URL}notify/v1/notify/entity-type`,
    });
};

export const getSubscribedInterfaces = (): AxiosPromise<T.ISubscriptionV2[]> => {
    return Api.get({
        url: `${GATEWAY_URL}notify/v1/subscribe?entityType=arch_interface`,
    });
};

export const getSubscribedPattern = (): AxiosPromise<T.ISubscriptionV2[]> => {
    return Api.get({
        url: `${GATEWAY_URL}notify/v1/subscribe?entityType=pattern`,
    });
};
