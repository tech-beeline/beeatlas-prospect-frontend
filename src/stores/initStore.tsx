import React, { createContext, FC, ReactElement } from 'react';
import { useLocalObservable } from 'mobx-react';

import { AuthStore, IAuthStore } from './AuthStore';

interface IStoreContext {
    authStore: IAuthStore;
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext);

export const StoreProvider: FC<{ children: ReactElement }> = ({ children }) => {
    const authStore = useLocalObservable(AuthStore);

    const stores = {
        authStore,
    };

    return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>;
};

export const useRootStore = () => {
    const rootStore = React.useContext(StoreContext);

    if (!rootStore) {
        throw new Error('useStore must be used within a StoreProvider');
    }

    return rootStore;
};
