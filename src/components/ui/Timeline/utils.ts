import { useEffect, useState } from 'react';

import { EXTRA_SMALL_DEVICE_QUERY } from './const';
import type { AtomPosition, TimelineIconType } from './types';

export const classNames = (...values: Array<string | false | null | undefined>) =>
    values.filter(Boolean).join(' ');

export const calcAtomType = (
    currentStepIndex: number,
    activeStepIndex: number,
    error = false,
): TimelineIconType => {
    if (activeStepIndex > currentStepIndex) {
        return 'active';
    }

    if (currentStepIndex === activeStepIndex) {
        return error ? 'error' : 'current';
    }

    return 'inactive';
};

export const calcStepPosition = (index: number, lastIndex: number): AtomPosition => {
    if (index === lastIndex) {
        return 'bottom';
    }

    if (index === 0) {
        return 'top';
    }

    return 'middle';
};

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
