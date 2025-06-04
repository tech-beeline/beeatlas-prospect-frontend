import { useEffect } from 'react';
import { setUserId } from 'features/analytics';

import { getUserInfo } from 'api/user';
import { useMountEffect } from 'hooks';

import { authInstance } from '../const';
import { useAuthStore } from '../store';

export const useAuth = () => {
    const { userInfo, setUserInfo, setIsAuthorizing, setIsError } = useAuthStore();

    useMountEffect(() => {
        (async () => {
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
        })();
    });

    useEffect(() => {
        if (userInfo?.email) {
            setUserId(userInfo.email);
        }
    }, [userInfo]);
};
