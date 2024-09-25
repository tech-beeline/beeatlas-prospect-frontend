import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

export const useMountEffect = (effectCallback: () => (() => void) | void) => {
    useEffect(effectCallback, []);
};

export const useTimer = (
    seconds: number,
    setSeconds: Dispatch<SetStateAction<number>>,
    condition = true,
    isReverse = false,
    delay = 1000,
) => {
    useEffect(() => {
        if (condition) {
            const timer =
                seconds > 0 &&
                (isReverse
                    ? setInterval(() => setSeconds(seconds - 1), delay)
                    : setInterval(() => setSeconds(seconds + 1), delay));

            return () => clearInterval(timer as ReturnType<typeof setInterval>);
        }
    }, [seconds, condition]);
};

export const useWindowResize = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    const onResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return width;
};

export const useModal = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => setModalOpened(true);

    const closeModal = () => setModalOpened(false);

    return {
        modalOpened,
        openModal,
        closeModal,
    };
};

const DEFAULT_DEBOUNCE_TIMEOUT = 300;

export const useDebounce = <T>(value: T, delay = DEFAULT_DEBOUNCE_TIMEOUT) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useShowTooltip = <T extends HTMLElement>() => {
    const [showTooltip, setShowTooltip] = useState(false);

    const ref = useCallback((node: T | null) => {
        if (node !== null) {
            setShowTooltip((node.scrollWidth ?? 0) > (node.offsetWidth ?? 0));
        }
    }, []);

    return [ref, showTooltip] as [(node: T | null) => void, boolean];
};
