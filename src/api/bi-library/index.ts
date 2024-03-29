import { AxiosPromise } from 'axios';

import Api from 'utils/api/axiosWrapper';

import { GATEWAY_URL } from '../const';

import * as T from './types';

export const getBIStatuses = (): AxiosPromise<T.IBIStatusData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v1/references/bi_status`,
    });
};

export const getBIChannels = (): AxiosPromise<T.IBIChannelData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v1/references/channels`,
    });
};

export const getBIFeelings = (): AxiosPromise<T.IBIFeelingData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v1/references/feelings`,
    });
};

export const getBIParticipants = (): AxiosPromise<T.IBIPatricipantData[]> => {
    return Api.get({
        url: `${GATEWAY_URL}cx/v1/references/participants`,
    });
};
