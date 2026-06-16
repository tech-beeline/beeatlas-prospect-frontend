import { UserManager } from 'oidc-client-ts';

import { getUserInfo } from 'api/user';

import { AuthFlowContext, IAuthProvider } from '../types';

const userManager = new UserManager({
    authority: `${window.FEATURE_FLAGS.FLAG_AUTHENTIK_URL}`,
    client_id: window.FEATURE_FLAGS.FLAG_AUTHENTIK_CLIENT_ID,
    redirect_uri: window.location.href,
    scope: 'openid profile email offline_access',
    automaticSilentRenew: true,

    metadata: {
        issuer: window.FEATURE_FLAGS.FLAG_AUTHENTIK_URL,
        authorization_endpoint: `${window.FEATURE_FLAGS.FLAG_AUTHENTIK_URL}/application/o/authorize/`,
        token_endpoint: `${window.FEATURE_FLAGS.FLAG_AUTHENTIK_URL}/application/o/token/`,
        end_session_endpoint: `${window.FEATURE_FLAGS.FLAG_AUTHENTIK_URL}/application/o/beeatlas/end-session/`,
    },
});

export const oidcAuthProvider: IAuthProvider = {
    supportsSignout: true,
    shouldReauthenticateOnPageShow: true,

    async authenticate({ setUserInfo, setIsAuthorizing, setIsError }: AuthFlowContext) {
        const user = await userManager.getUser();
        const params = new URLSearchParams(window.location.search);
        const [codeParam, stateParam] = [params.get('code'), params.get('state')];

        if (user?.refresh_token) {
            await userManager.signinSilent();
        } else if (codeParam && stateParam) {
            const authenticatedUser = await userManager.signinRedirectCallback();
            const url = new URL(window.location.href);
            url.searchParams.delete('code');
            url.searchParams.delete('state');
            window.history.pushState(null, '', url);

            setUserInfo(authenticatedUser.profile);
        } else {
            await userManager.signinRedirect();
        }

        const userData = await getUserInfo();

        if (userData.status !== 200 || Object.entries(userData.data).length === 0) {
            setIsError(true);
        }

        setIsAuthorizing(false);
    },

    async getAccessToken() {
        const user = await userManager.getUser();

        return user?.access_token ?? null;
    },

    async refreshTokens() {
        await userManager.signinSilent();
    },

    async signout() {
        await userManager.signoutRedirect();
    },
};
