import { VKITAuthTokens } from '@beeline/lk-auth';

export interface IAuthStore {
    isAuth: boolean;
    userInfo: Record<string, any> | null;
    isAuthorizing: Promise<VKITAuthTokens> | null;
    setIsAuth: (isAuth: boolean) => void;
    setUserInfo: (userInfo: Record<string, any> | null) => void;
    setIsAuthorizing: (isAuthorizing: Promise<VKITAuthTokens> | null) => void;
    clearStore: () => void;
}
