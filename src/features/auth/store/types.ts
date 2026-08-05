export interface IAuthStore {
    userInfo: Record<string, any> | null;
    beeatlasUserId: number | null;
    isAuthorizing: boolean;
    isError: boolean;
    setUserInfo: (userInfo: Record<string, any> | null) => void;
    setBeeatlasUserId: (beeatlasUserId: number | null) => void;
    setIsAuthorizing: (isAuthorizing: boolean) => void;
    setIsError: (isError: boolean) => void;
    clearStore: () => void;
}
