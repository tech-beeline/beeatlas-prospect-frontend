import Api from 'utils/api/axiosWrapper';
import { formatNullableBooleanParam } from 'utils/formatters';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const postSubscription = (params: T.ISubscriptionForm) => {
    return Api.post({
        url: `${GATEWAY_URL}notify/v1/subscribe/${params.entityType}/${
            params.id
        }?${formatNullableBooleanParam('sub-children', params.subChildren)}`,
    });
};

export const deleteSubscription = (params: T.ISubscriptionForm) => {
    return Api.delete({
        url: `${GATEWAY_URL}notify/v1/subscribe/${params.entityType}/${params.id}`,
    });
};
