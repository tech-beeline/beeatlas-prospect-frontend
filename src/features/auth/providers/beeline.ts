import VKITAuth from '@beeline/lk-auth';

import { getUserInfo } from 'api/user';
import {
    DEV_AUTH_LINK,
    FUNC_MOCK_AUTH_LINK,
    LOCALHOST_LINK,
    PROD_AUTH_LINK,
    TEST_AUTH_LINK,
} from 'utils/const';

import { AuthFlowContext, IAuthProvider } from '../types';

const hostnameToAuthMap: Record<string, string> = {
    'eafdmmart-prod.apps.yd-k03.vimpelcom.ru': PROD_AUTH_LINK,
    'beeatlas.vimpelcom.ru': PROD_AUTH_LINK,
    'techradar.vimpelcom.ru': PROD_AUTH_LINK,
    'tr.vimpelcom.ru': PROD_AUTH_LINK,
    'eafdmmart-dev.apps.yd-m6-kt22.vimpelcom.ru': DEV_AUTH_LINK,
    'eafdmmart-e2e.apps.yd-m6-kt22.vimpelcom.ru': TEST_AUTH_LINK,
    'eafdmmart-func.apps.yd-m6-kt22.vimpelcom.ru': FUNC_MOCK_AUTH_LINK,
};

const authInstance = new VKITAuth({
    authUrl: hostnameToAuthMap[window.location.hostname] ?? LOCALHOST_LINK,
});

export const beelineAuthProvider: IAuthProvider = {
    supportsSignout: false,
    shouldReauthenticateOnPageShow: false,

    async authenticate({ setUserInfo, setIsAuthorizing, setIsError }: AuthFlowContext) {
        if (authInstance.getRefreshToken()) {
            await authInstance.refreshTokens({
                restartAuthFlowOnFail: true,
            });
        } else if (authInstance.hasNecessaryParams()) {
            const { access_token } = await authInstance.exchangeCode();

            setUserInfo(authInstance.getClaims(access_token));
        } else {
            authInstance.startAuth();
            // Ждём редиректа в eAuth
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            await new Promise(() => {});
        }

        const userData = await getUserInfo();

        if (userData.status !== 200 || Object.entries(userData.data).length === 0) {
            setIsError(true);
        }

        setIsAuthorizing(false);
    },

    async getAccessToken() {
        return authInstance.getAccessToken();
    },

    async refreshTokens(options) {
        await authInstance.refreshTokens({
            restartAuthFlowOnFail: true,
            ...options,
        });
    },
};
