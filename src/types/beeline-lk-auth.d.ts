declare module '@beeline/lk-auth' {
    interface VKITAuthOptions {
        authUrl: string;
    }

    interface RefreshTokensOptions {
        restartAuthFlowOnFail?: boolean;
    }

    export default class VKITAuth {
        constructor(options: VKITAuthOptions);
        getRefreshToken(): string | null;
        getAccessToken(): string | null;
        refreshTokens(options?: RefreshTokensOptions): Promise<void>;
        hasNecessaryParams(): boolean;
        exchangeCode(): Promise<{ access_token: string }>;
        getClaims(accessToken: string): Record<string, unknown>;
        startAuth(): void;
    }
}
