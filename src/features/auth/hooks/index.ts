import { useMountEffect } from 'hooks';

import { authInstance } from '../const';
import { useAuthStore } from '../store';

export const useAuth = () => {
    const { setUserInfo, setIsAuthorizing } = useAuthStore();

    useMountEffect(() => {
        (async () => {
            if (authInstance.getRefreshToken()) {
                await authInstance.refreshTokens({
                    restartAuthFlowOnFail: true,
                });

                setIsAuthorizing(false);
            } else if (authInstance.hasNecessaryParams()) {
                const { access_token } = await authInstance.exchangeCode();

                setUserInfo(authInstance.getClaims(access_token));

                setIsAuthorizing(false);
            } else {
                authInstance.startAuth();
            }
        })();
    });
};
