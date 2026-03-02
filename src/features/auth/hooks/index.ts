import { useEffect } from 'react';
import { setUserId } from 'features/analytics';
import { UserManager } from 'oidc-client-ts';

import { getUserInfo } from 'api/user';
import { useMountEffect } from 'hooks';

import { AUTHENTIK_CLIENT_ID, authInstance } from '../const';
import { useAuthStore } from '../store';

export const userManager = new UserManager({
    authority: `${window.FEATURE_FLAGS.FLAG_AUTHENTIK_URL}`,
    client_id: AUTHENTIK_CLIENT_ID,
    redirect_uri: window.location.href,
    scope: 'openid profile email offline_access',
    automaticSilentRenew: true,

    metadata: {
        issuer: window.FEATURE_FLAGS.FLAG_AUTHENTIK_URL,
        authorization_endpoint: `${window.FEATURE_FLAGS.FLAG_AUTHENTIK_URL}/application/o/authorize/`,
        token_endpoint: `${window.FEATURE_FLAGS.FLAG_AUTHENTIK_URL}/application/o/token/`,
    },
});

export const useAuth = () => {
    const { userInfo, setUserInfo, setIsAuthorizing, setIsError } = useAuthStore();

    useMountEffect(() => {
        (async () => {
            if (window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND) {
                const user = await userManager.getUser();
                const params = new URLSearchParams(window.location.search);
                const [codeParam, stateParam] = [params.get('code'), params.get('state')];

                if (user?.refresh_token) {
                    await userManager.signinSilent();
                } else if (codeParam && stateParam) {
                    const u = await userManager.signinRedirectCallback();
                    const url = new URL(window.location.href);
                    url.searchParams.delete('code');
                    url.searchParams.delete('state');
                    window.history.pushState(null, '', url);

                    setUserInfo(u.profile);
                } else {
                    await userManager.signinRedirect();
                }
                const userData = await getUserInfo();

                if (userData.status !== 200 || Object.entries(userData.data).length === 0) {
                    setIsError(true);
                }

                setIsAuthorizing(false);
            } else {
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
            }
        })();
    });

    useEffect(() => {
        if (userInfo?.email) {
            setUserId(userInfo.email);
        }
    }, [userInfo]);
};
