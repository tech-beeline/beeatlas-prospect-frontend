import axios from 'axios';
import { authInstance, useAuthStore } from 'features/auth';

// import { postRefreshToken } from 'api/auth';
// import { getStorage } from 'stores/utils';
import Api from './Api';
// import { HOST } from './env';

const baseURL = '';

// const source = axios.CancelToken.source();
// const cancelToken = source.token;

const instanceOfAxios = axios.create({
    baseURL,
});

// let callRequestCount = 0;

instanceOfAxios.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken;

        if (accessToken) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // return { ...config, cancelToken };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instanceOfAxios.interceptors.response.use(
    (response) => {
        // console.log('response', response);
        // source.cancel();
        // if (response.status === 200 && response.data.data?.access_token) {
        //     persistStorage('accessToken', response.data.data.access_token);
        //     persistStorage('refreshToken', response.data.data.refresh_token);
        // }

        // TODO: если нужно сохранять окно кода при обновлении страницы
        // const isConditionCode = Boolean(
        //     response.data.data?.remain && response.data.data?.attempts_count,
        // );

        // if (isConditionCode) {
        //     console.log('conditionCode', isConditionCode);
        //     persistStorage('remain', response.data.data?.remain);
        //     persistStorage('attemptsCount', response.data.data?.attempts_count);
        // }

        if (response.status !== 200) {
            console.error('Status:', response.status);
        }

        return response;
    },
    async (error) => {
        // TODO: Сюда Store и отслеживать в AuthPage -> ErrorDisplay
        // error.errorText = TEXT.ERROR_NETWORK;

        // console.log(axios.isCancel(error));

        switch (error.response.status) {
            case 504 || 502:
            // error.errorText = TEXT.ERROR_504_OR_502;
            case 500:
                // error.errorText = TEXT.ERROR_500;
                break;
            case 400:
                // error.errorText = TEXT.ERROR_400;
                break;
            case 404:
                // error.errorText = TEXT.ERROR_404;
                break;
            case 401:
                // requestTokenRefresh
                // бэк должен валидировать токен и если нет то возвращает ошибку 401

                // error.errorText = TEXT.ERROR_401;
                try {
                    const { access_token, refresh_token } = await authInstance.refreshTokens();

                    useAuthStore.getState().setTokens(access_token, refresh_token);

                    return instanceOfAxios.request(error.config);

                    // const { access_token, refresh_token } = await auth.refreshTokens();

                    // useAuthStore.getState().setTokens(access_token, refresh_token);
                    // const refreshToken = getStorage('refreshToken');

                    // if (refreshToken && callRequestCount <= 2) {
                    //     // await postRefreshToken(refreshToken);

                    //     callRequestCount++;

                    // return instanceOfAxios.request(error.config);
                    // } else if (callRequestCount === 3) {
                    //     clearStorage();

                    //     // callRequestCount = 0;
                    // }

                    // if (error.response.status !== 401) {
                    //     // NotificationToast.addNotificationToast('error', error.errorText);
                    // }

                    // return;
                } catch (e) {
                    console.error(e);
                }
                break;
        }
        return Promise.reject(error);
    },
);

export default new Api(instanceOfAxios);
