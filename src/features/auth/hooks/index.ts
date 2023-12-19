import { useEffect } from 'react';

import { useMountEffect } from 'hooks';
import { isFunc } from 'utils/const';

import { authInstance } from '../const';
import { useAuthStore } from '../store';

export const useAuth = () => {
    const { isAuth, setIsAuth, userInfo, setUserInfo, setIsAuthorizing } = useAuthStore();

    useMountEffect(() => {
        (async () => {
            if (authInstance.hasNecessaryParams()) {
                const authPromise = authInstance.exchangeCode();

                setIsAuthorizing(authPromise);

                const { access_token } = await authPromise;

                setUserInfo(authInstance.getClaims(access_token));

                setIsAuthorizing(null);
            } else if (!(isAuth && isFunc)) {
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
