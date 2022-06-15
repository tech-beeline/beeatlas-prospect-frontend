import * as METHODS from 'api/auth';

import { IAuthStore } from './types';
export * from './types';

export const AuthStore = (): IAuthStore => {
    // const isAuth = getStorage('isAuth') === 'true';
    // TODO: cookie
    const isAuth = true;

    return {
        isAuth: isAuth || false,

        isLoadingAuth: false,

        authId: '',

        accessToken: '',
        refreshToken: '',

        setAuth(isAuth) {
            this.isAuth = isAuth;
        },

        setLoadingAuth(isLoadingAuth) {
            this.isLoadingAuth = isLoadingAuth;
        },

        setAuthId(authId) {
            this.authId = authId;
        },

        logout() {
            this.setAuth(false);

            // clearStorage();
        },

        async auth(phone) {
            this.setLoadingAuth(true);

            try {
                const res = await METHODS.postAuth({ phone });

                // this.setAuthId(res.data?.auth_req_id);

                return res;
            } catch (error) {
                console.error((error as Error).message);
            } finally {
                this.setLoadingAuth(false);
            }
        },

        // TODO: setInterval
        // if ok - save tokens
        async authCheck(authId) {
            try {
                const res = await METHODS.getTokens({ authId });

                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },
    };
};
