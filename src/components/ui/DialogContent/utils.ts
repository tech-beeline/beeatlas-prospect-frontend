import { type ReactNode, type RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { EXTRA_SMALL_DEVICE_QUERY, SCROLL_UPDATE_DEBOUNCE_MS } from './const';

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

export const useDebounceCallback = <T extends (...args: never[]) => void>(
    callback: T,
    delay: number,
): [(...args: Parameters<T>) => void, () => void] => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearInnerTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const debouncedFunc = useCallback(
        (...args: Parameters<T>) => {
            clearInnerTimeout();
            timeoutRef.current = setTimeout(() => {
                callback(...args);
                timeoutRef.current = null;
            }, delay);
        },
        [callback, delay, clearInnerTimeout],
    );

    return [debouncedFunc, clearInnerTimeout];
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

export const useScrollableContent = (
    children: ReactNode,
    fullscreen: boolean,
): [RefObject<HTMLDivElement>, boolean] => {
    const dialogChildrenRef = useRef<HTMLDivElement>(null);
    const [showScroll, setShowScroll] = useState(false);

    const updateScrollable = useCallback(() => {
        const element = dialogChildrenRef.current;

        if (!element) {
            return;
        }

        setShowScroll(element.scrollHeight !== element.clientHeight);
    }, []);

    const [debouncedUpdateScrollable] = useDebounceCallback(
        updateScrollable,
        SCROLL_UPDATE_DEBOUNCE_MS,
    );

    useEffect(() => {
        if (fullscreen) {
            return undefined;
        }

        const onResize = () => {
            debouncedUpdateScrollable();
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [debouncedUpdateScrollable, fullscreen]);

    useEffect(() => {
        updateScrollable();
    }, [children, updateScrollable]);

    return [dialogChildrenRef, showScroll];
};
