import { useCallback, useRef } from 'react';

/**
 * Возвращает функцию с debounce и функцию отмены отложенного вызова.
 */
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
