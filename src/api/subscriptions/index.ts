import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const postSubscription = (params: T.ISubscriptionForm) => {
    return Api.post({
        url: `${GATEWAY_URL}notify/v1/subscribe/${params.entityType}/${params.id}`,
    });
};

export const deleteSubscription = (params: T.ISubscriptionForm) => {
    return Api.delete({
        url: `${GATEWAY_URL}notify/v1/subscribe/${params.entityType}/${params.id}`,
    });
};
