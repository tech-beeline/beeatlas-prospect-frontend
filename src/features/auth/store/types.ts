export interface IAuthStore {
    userInfo: Record<string, any> | null;
    isAuthorizing: boolean;
    isError: boolean;
    setUserInfo: (userInfo: Record<string, any> | null) => void;
    setIsAuthorizing: (isAuthorizing: boolean) => void;
    setIsError: (isError: boolean) => void;
    clearStore: () => void;
}
