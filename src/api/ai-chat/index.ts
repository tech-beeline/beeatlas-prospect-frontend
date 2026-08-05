import { AxiosPromise } from 'axios';

import { GATEWAY_AI_CHAT_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';

import * as T from './types';

export const getAllUserSessions = (userId: number): AxiosPromise<T.ISession[]> => {
    return Api.get({
        url: `${GATEWAY_AI_CHAT_URL}v1/user/${userId}/sessions`,
    });
};

export const getSessionByKey = (sessionKey: string): AxiosPromise<T.ISession> => {
    return Api.get({
        url: `${GATEWAY_AI_CHAT_URL}v1/session/${sessionKey}`,
    });
};

export const getSessionHistory = (sessionKey: string): AxiosPromise<T.ISessionMessage[]> => {
    return Api.get({
        url: `${GATEWAY_AI_CHAT_URL}v1/session/${sessionKey}/history`,
    });
};

export const postSession = (data: T.IPostSessionForm): AxiosPromise<T.IPostSessionResponse> => {
    return Api.post({
        url: `${GATEWAY_AI_CHAT_URL}v1/session`,
        data,
    });
};

export const deleteSession = (sessionKey: string) => {
    return Api.delete({
        url: `${GATEWAY_AI_CHAT_URL}v1/session/${sessionKey}`,
    });
};

export const createMessage = (sessionKey: string | null, data: T.IPostMessageForm) => {
    return Api.patch({
        url: `${GATEWAY_AI_CHAT_URL}v1/session/${sessionKey}/message`,
        data,
    });
};
