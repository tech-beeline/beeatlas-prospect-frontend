import VKITAuth from '@beeline/lk-auth';

import { FUNC_MOCK_AUTH_LINK, isDev, isFunc, isProd, LOCALHOST_LINK } from 'utils/const';

export const authInstance = new VKITAuth({
    authUrl: isFunc
        ? FUNC_MOCK_AUTH_LINK
        : isProd
        ? 'https://eauth-prod.apps.mn-kd06.vimpelcom.ru'
        : isDev
        ? LOCALHOST_LINK
        : // @TODO Через какое-то время должен поменять адрес авторизации в самой библиотеке
          'https://eauth-dev.apps.yd-kt05.vimpelcom.ru',
});
