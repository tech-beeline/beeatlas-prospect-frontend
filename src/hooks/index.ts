import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { useGetAllProductsQuery, useGetUserProductsQuery } from 'api/queries/product';
import { useGetUserInfoQuery } from 'api/queries/profile';

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

export const useShowTooltipOld = <T extends HTMLElement>() => {
    const [showTooltip, setShowTooltip] = useState(false);

    const ref = useCallback((node: T | null) => {
        if (node !== null) {
            console.log(node.scrollHeight, node.offsetHeight);
            setShowTooltip(
                (node.scrollWidth ?? 0) > (node.offsetWidth ?? 0) ||
                    (node.scrollHeight ?? 0) > (node.offsetHeight ?? 0),
            );
        }
    }, []);

    return [ref, showTooltip] as [(node: T | null) => void, boolean];
};

export const useShowTooltip = <T extends HTMLElement>(elementRef: MutableRefObject<T | null>) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const observer = useRef(
        new ResizeObserver((entries) => {
            if (entries[0]) {
                setShowTooltip(
                    (elementRef.current?.scrollWidth ?? 0) >
                        (elementRef.current?.offsetWidth ?? 0) ||
                        (elementRef.current?.scrollHeight ?? 0) >
                            (elementRef.current?.offsetHeight ?? 0),
                );
            }
        }),
    );

    useEffect(() => {
        if (elementRef.current) {
            observer.current.observe(elementRef.current);
        }
        return () => observer.current.disconnect();
    }, [elementRef, observer]);

    return showTooltip;
};

export const useGetProductsQuery = () => {
    const { data: userInfo } = useGetUserInfoQuery();

    const isAdministrator = userInfo?.roles?.includes('ADMINISTRATOR');
    const userProductIds = userInfo?.productsIds || [];

    const allProductsQuery = useGetAllProductsQuery();
    const productsByIdsQuery = useGetUserProductsQuery(userProductIds);

    if (!userInfo) {
        return {
            data: undefined,
            isLoading: true,
            isError: false,
            isAdministrator: false,
        };
    }

    const data = isAdministrator ? allProductsQuery.data : productsByIdsQuery.data;
    const isLoading = isAdministrator ? allProductsQuery.isLoading : productsByIdsQuery.isLoading;
    const isError = isAdministrator ? allProductsQuery.isError : productsByIdsQuery.isError;

    return {
        data,
        isLoading,
        isError,
        isAdministrator,
    };
};
