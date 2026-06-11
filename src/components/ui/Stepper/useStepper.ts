import { useCallback, useEffect, useRef, useState } from 'react';

import type { StepType } from './types';
import { scrollToStep } from './utils';

interface UseStepperParams {
    activeStepId: StepType['id'];
    direction: 'vertical' | 'horizontal';
    enableAutoScroll: boolean;
    mobile: boolean;
    steps: StepType[];
    switchLength: number;
}

export const useStepper = ({
    activeStepId,
    direction,
    enableAutoScroll,
    mobile,
    steps,
    switchLength,
}: UseStepperParams) => {
    const [counter, setCounter] = useState(0);
    const [showRightButton, setShowRightButton] = useState(!mobile);
    const [showLeftButton, setShowLeftButton] = useState(!mobile);
    const initialRenderRef = useRef(true);
    const bodyRef = useRef<HTMLDivElement>(null);

    const buttonVisibilityController = useCallback(() => {
        const bodyElem = bodyRef.current;

        if (!bodyElem) {
            return;
        }

        const scrollIsVisible = bodyElem.scrollWidth !== bodyElem.clientWidth;
        const scrollOnStart = bodyElem.scrollLeft === 0;
        const scrollOnEnd = bodyElem.scrollLeft + bodyElem.clientWidth >= bodyElem.scrollWidth;

        setShowRightButton(!scrollOnEnd && scrollIsVisible);
        setShowLeftButton(!scrollOnStart && scrollIsVisible);
    }, []);

    useEffect(() => {
        const bodyElem = bodyRef.current;

        if (mobile || direction === 'vertical' || !bodyElem) {
            setShowRightButton(false);
            setShowLeftButton(false);
            return;
        }

        buttonVisibilityController();

        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const scrollResizeListener = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => buttonVisibilityController(), 100);
        };

        bodyElem.addEventListener('scroll', scrollResizeListener);
        window.addEventListener('resize', scrollResizeListener);

        return () => {
            bodyElem.removeEventListener('scroll', scrollResizeListener);
            window.removeEventListener('resize', scrollResizeListener);
        };
    }, [buttonVisibilityController, direction, mobile]);

    useEffect(() => {
        const bodyElem = bodyRef.current;

        if (!initialRenderRef.current && !enableAutoScroll) {
            return;
        }

        if (initialRenderRef.current) {
            initialRenderRef.current = false;
        }

        const activeStepIndex = steps.findIndex((item) => item.id === activeStepId);

        if (bodyElem && activeStepIndex >= 0) {
            const activeStepElement = bodyElem.children[activeStepIndex];

            if (activeStepElement) {
                scrollToStep(activeStepElement, 'center');
            }

            setCounter(activeStepIndex);
        }
    }, [activeStepId, enableAutoScroll, steps]);

    const handleRightClick = useCallback(() => {
        const bodyObj = bodyRef.current;

        if (!bodyObj || bodyObj.scrollLeft + bodyObj.clientWidth >= bodyObj.scrollWidth) {
            return;
        }

        let newValue = counter + switchLength;

        if (newValue > bodyObj.children.length - 1) {
            newValue = bodyObj.children.length - 1;
        }

        const stepElement = bodyObj.children[newValue];

        if (stepElement) {
            scrollToStep(stepElement);
        }

        setCounter(newValue);
    }, [counter, switchLength]);

    const handleLeftClick = useCallback(() => {
        const bodyObj = bodyRef.current;

        if (!bodyObj) {
            return;
        }

        let newValue = counter - switchLength;

        if (newValue < 0) {
            newValue = 0;
        }

        const stepElement = bodyObj.children[newValue];

        if (stepElement) {
            scrollToStep(stepElement);
        }

        setCounter(newValue);
    }, [counter, switchLength]);

    return {
        bodyRef,
        handleLeftClick,
        handleRightClick,
        showLeftButton,
        showRightButton,
    };
};
