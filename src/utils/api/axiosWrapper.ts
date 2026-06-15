import axios from 'axios';
import { getAuthProvider } from 'features/auth';

import Api from './Api';

const baseURL = '';

const instanceOfAxios = axios.create({
    baseURL,
});

instanceOfAxios.interceptors.request.use(
    async (config) => {
        const accessToken = await getAuthProvider().getAccessToken();

        if (accessToken) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${accessToken}`;
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
                    await getAuthProvider().refreshTokens({ restartAuthFlowOnFail: true });
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
