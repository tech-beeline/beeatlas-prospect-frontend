import { useEffect, useState } from 'react';

import { EXTRA_SMALL_DEVICE_QUERY } from './const';

export const classNames = (
    ...args: Array<string | Record<string, boolean> | undefined | false>
): string =>
    args
        .flatMap((arg) => {
            if (!arg) {
                return [];
            }

            if (typeof arg === 'string') {
                return [arg];
            }

            return Object.entries(arg)
                .filter(([, value]) => value)
                .map(([key]) => key);
        })
        .join(' ');

export const useExtraSmallDevice = (): boolean => {
    const [isExtraSmallDevice, setIsExtraSmallDevice] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia(EXTRA_SMALL_DEVICE_QUERY).matches : false,
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(EXTRA_SMALL_DEVICE_QUERY);
        const handleChange = (event: MediaQueryListEvent) => {
            setIsExtraSmallDevice(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return isExtraSmallDevice;
};
