import Api from 'utils/api/axiosWrapper';

import * as T from './types';

// const cancelToken = axiosPack.CancelToken.source();

const authApi = '/oauth-idp/api/v2/user-authentificate';

export const postAuth = (data: T.IAuthData) => {
    return Api.post({
        url: `${authApi}/by-mobile-id?login=${data.phone}`,
        data,
    });
};

export const getTokens = (data: T.IAuthIdData) => {
    return Api.get({
        url: `${authApi}/get-token?guid=${data.authId}`,
    });
};
