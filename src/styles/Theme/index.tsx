import React, { useEffect } from 'react';
import { useThemeStore } from 'features/theme';

import { THEME_ELEMENT_ID } from 'styles/const';

export const Theme = ({ children }: any) => {
    const themeIsDark = useThemeStore((state) => state.themeIsDark);

    useEffect(() => {
        const html = document.getElementsByTagName('html')[0];

        themeIsDark
            ? (html.style.backgroundColor = '#141414')
            : (html.style.backgroundColor = '#FFFFFF');
    }, [themeIsDark]);

    return (
        <div id={THEME_ELEMENT_ID} className={themeIsDark ? 'darkTheme' : 'lightTheme'}>
            {children}
        </div>
    );
};
