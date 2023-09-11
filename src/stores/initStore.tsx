import React, { createContext, FC, ReactElement } from 'react';
import { useLocalObservable } from 'mobx-react';

import { FDMStore, IFDMStore } from './FDMStore';
import { GeneralStore, IGeneralStore } from './GeneralStore';

interface IStoreContext {
    generalStore: IGeneralStore;
    fdmStore: IFDMStore;
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext);

export const StoreProvider: FC<{ children: ReactElement }> = ({ children }) => {
    const generalStore = useLocalObservable(GeneralStore);
    const fdmStore = useLocalObservable(FDMStore);

    const stores = {
        generalStore,
        fdmStore,
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
