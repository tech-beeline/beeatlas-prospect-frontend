import VKITAuth from '@beeline/lk-auth';

import { getUserInfo } from 'api/user';

import { AuthFlowContext, IAuthProvider } from '../types';

const authInstance = new VKITAuth({
    authUrl: window.FEATURE_FLAGS.FLAG_EAUTH_URL,
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
