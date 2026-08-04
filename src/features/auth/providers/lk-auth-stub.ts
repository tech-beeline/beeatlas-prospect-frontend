const BEELINE_AUTH_ERROR =
    '@beeline/lk-auth не установлен. Для внутреннего контура скопируйте .npmrc.example в .npmrc и выполните npm install.';

class VKITAuthStub {
    constructor(_options: { authUrl: string }) {
        console.warn(BEELINE_AUTH_ERROR);
    }

    getRefreshToken(): null {
        return null;
    }

    getAccessToken(): null {
        return null;
    }

    async refreshTokens(): Promise<void> {
        throw new Error(BEELINE_AUTH_ERROR);
    }

    hasNecessaryParams(): false {
        return false;
    }

    async exchangeCode(): Promise<{ access_token: string }> {
        throw new Error(BEELINE_AUTH_ERROR);
    }

    getClaims(_accessToken: string): Record<string, unknown> {
        throw new Error(BEELINE_AUTH_ERROR);
    }

    startAuth(): void {
        throw new Error(BEELINE_AUTH_ERROR);
    }
}

export default VKITAuthStub;
