import { useEffect } from 'react';
import VKITAuth from '@beeline/lk-auth';

import { useMountEffect } from 'hooks';
import { FUNC_MOCK_AUTH_LINK, isDev, isFunc, LOCALHOST_LINK } from 'utils/const';

import { useAuthStore } from '../store';

const auth = new VKITAuth({
    authUrl: isFunc
        ? FUNC_MOCK_AUTH_LINK
        : isDev
        ? LOCALHOST_LINK
        : // @TODO Через какое-то время должен поменять адрес авторизации в самой библиотеке
          'https://eauth-dev.apps.yd-kt05.vimpelcom.ru',
});

export const useAuth = () => {
    const { isAuth, setIsAuth, userInfo, setUserInfo, setTokens, setCodeAndState } = useAuthStore();

    useMountEffect(() => {
        (async () => {
            if (auth.hasNecessaryParams()) {
                const { access_token, refresh_token } = await auth.exchangeCode();

                setCodeAndState(auth.getCodeParam() ?? '', auth.getStateParam() ?? '');

                setTokens(access_token, refresh_token);

                setUserInfo(auth.getClaims(access_token));
            } else if (!(isAuth && isFunc)) {
                // clearStore();
                auth.startAuth();
            }
        })();
    });

    useEffect(() => {
        (async () => {
            if (userInfo && Object.keys(userInfo).length > 0 && isAuth === false) {
                setIsAuth(true);
            }
        })();
    }, [userInfo, isAuth]);
};
