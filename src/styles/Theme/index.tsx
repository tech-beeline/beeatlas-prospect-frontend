import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from 'stores/initStore';
import { THEME_ELEMENT_ID } from 'styles/const';

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
        <div id={THEME_ELEMENT_ID} className={!themeIsDark ? 'lightTheme' : 'darkTheme'}>
            {children}
        </div>
    );
});
