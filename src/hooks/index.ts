import { Dispatch, SetStateAction, useEffect } from 'react';

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
