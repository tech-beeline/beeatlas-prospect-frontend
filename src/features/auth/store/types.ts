export interface IAuthStore {
    userInfo: Record<string, any> | null;
    isAuthorizing: boolean;
    setUserInfo: (userInfo: Record<string, any> | null) => void;
    setIsAuthorizing: (isAuthorizing: boolean) => void;
    clearStore: () => void;
}
