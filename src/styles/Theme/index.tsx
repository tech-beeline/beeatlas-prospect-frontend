import React from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from 'stores/initStore';

export const Theme = observer(({ children }: any) => {
    const {
        generalStore: { themeIsDark },
    } = useRootStore();

    return <div className={!themeIsDark ? 'lightTheme' : 'darkTheme'}>{children}</div>;
});
