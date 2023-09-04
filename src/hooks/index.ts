import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
