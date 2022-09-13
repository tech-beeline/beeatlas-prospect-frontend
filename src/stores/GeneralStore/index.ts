import { getStorage, persistStorage } from 'stores/utils';

import { IGeneralStore } from './types';
export * from './types';

export const GeneralStore = (): IGeneralStore => {
    const themeIsDarkKey = 'themeIsDark';

    const themeIsDark = getStorage(themeIsDarkKey) === 'true';

    // const slippageToleranceFromStorage = getStorage(themeIsDar, false);

    return {
        themeIsDark: themeIsDark || false,

        toggleTheme() {
            this.themeIsDark = !this.themeIsDark;

            persistStorage(themeIsDarkKey, this.themeIsDark.toString());
        },
    };
};
