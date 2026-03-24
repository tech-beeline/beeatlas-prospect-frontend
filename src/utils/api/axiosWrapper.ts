import axios from 'axios';
import { authInstance } from 'features/auth';
import { userManager } from 'features/auth/hooks';

import Api from './Api';

const baseURL = '';

const instanceOfAxios = axios.create({
    baseURL,
});

instanceOfAxios.interceptors.request.use(
    async (config) => {
        if (window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND) {
            const u = await userManager.getUser();
            if (u?.access_token) {
                // @ts-ignore
                config.headers.Authorization = `Bearer ${u.access_token}`;
            }
        } else {
            const accessToken = authInstance.getAccessToken();
            if (accessToken) {
                // @ts-ignore
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instanceOfAxios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            console.error('Status:', response.status);
        }

        return response;
    },
    async (error) => {
        // TODO: Сюда Store и отслеживать в AuthPage -> ErrorDisplay
        // error.errorText = TEXT.ERROR_NETWORK;

        // console.log(axios.isCancel(error));
        console.log(error);

        switch (error.response.status) {
            case 504 || 502:
            case 500:
                break;
            case 400:
                break;
            case 404:
                break;
            case 401:
                try {
                    if (window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND) {
                        await userManager.signinSilent();
                    } else {
                        await authInstance.refreshTokens({ restartAuthFlowOnFail: true });
                    }
                    return instanceOfAxios.request(error.config);
                } catch (e) {
                    console.error(e);
                }
                break;
        }
        return Promise.reject(error);
    },
);

export default new Api(instanceOfAxios);
