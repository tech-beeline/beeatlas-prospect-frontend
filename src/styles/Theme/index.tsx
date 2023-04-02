import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from 'stores/initStore';

export const Theme = observer(({ children }: any) => {
    const {
        generalStore: { themeIsDark },
    } = useRootStore();

    useEffect(() => {
        const html = document.getElementsByTagName('html')[0];

        themeIsDark
            ? (html.style.backgroundColor = '#141414')
            : (html.style.backgroundColor = '#FFFFFF');
    }, [themeIsDark]);

    return (
        <div id="test" className={!themeIsDark ? 'lightTheme' : 'darkTheme'}>
            {children}
        </div>
    );
});
