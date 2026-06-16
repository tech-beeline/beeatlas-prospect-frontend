export interface AuthFlowContext {
    setUserInfo: (userInfo: Record<string, any> | null) => void;
    setIsAuthorizing: (isAuthorizing: boolean) => void;
    setIsError: (isError: boolean) => void;
}

export interface RefreshTokensOptions {
    restartAuthFlowOnFail?: boolean;
}

export interface IAuthProvider {
    authenticate: (context: AuthFlowContext) => Promise<void>;
    getAccessToken: () => Promise<string | null>;
    refreshTokens: (options?: RefreshTokensOptions) => Promise<void>;
    signout?: () => Promise<void>;
    supportsSignout: boolean;
    shouldReauthenticateOnPageShow: boolean;
}
