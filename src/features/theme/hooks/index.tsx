import { useEffect } from 'react';

import { useThemeStore } from '../store';

export const useTheme = () => {
    const themeIsDark = useThemeStore((state) => state.themeIsDark);

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];

        body.className = themeIsDark ? 'darkTheme' : 'lightTheme';
    }, [themeIsDark]);
};
