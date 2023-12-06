import { useEffect } from 'react';

import { useMountEffect } from 'hooks';
import { isFunc } from 'utils/const';

import { authInstance } from '../const';
import { useAuthStore } from '../store';

export const useAuth = () => {
    const { isAuth, setIsAuth, userInfo, setUserInfo, setTokens, setCodeAndState } = useAuthStore();

    useMountEffect(() => {
        (async () => {
            if (authInstance.hasNecessaryParams()) {
                const { access_token, refresh_token } = await authInstance.exchangeCode();

                setCodeAndState(
                    authInstance.getCodeParam() ?? '',
                    authInstance.getStateParam() ?? '',
                );

                setTokens(access_token, refresh_token);

                setUserInfo(authInstance.getClaims(access_token));
            } else if (!(isAuth && isFunc)) {
                // clearStore();
                authInstance.startAuth();
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
