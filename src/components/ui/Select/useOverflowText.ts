import { useEffect, useRef, useState } from 'react';

import { MAX_OVERFLOW_VALUES_COUNT } from './const';
import { countOverflowNodes, createHiddenValueNodes, throttle } from './utils';

export const useOverflowText = ({
    hiddenRef,
    inputRef,
    values,
}: {
    hiddenRef: React.RefObject<HTMLParagraphElement | null>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    values: unknown[];
}) => {
    const [count, setCount] = useState(0);

    const onResize = throttle((target: HTMLInputElement) => {
        if (!hiddenRef.current) {
            return;
        }

        const { clientWidth } = target;
        const styles = globalThis.getComputedStyle(target, null);
        const paddingRight = Number.parseFloat(styles.getPropertyValue('padding-right')) || 0;
        const paddingLeft = Number.parseFloat(styles.getPropertyValue('padding-left')) || 0;

        hiddenRef.current.style.width = `${clientWidth - paddingLeft - paddingRight}px`;

        const { right } = hiddenRef.current.getBoundingClientRect();
        const nextCount = Math.min(
            MAX_OVERFLOW_VALUES_COUNT,
            countOverflowNodes({
                parentRight: right,
                nodes: hiddenRef.current.childNodes,
            }),
        );

        setCount((prevCount) => (prevCount !== nextCount ? nextCount : prevCount));
    }, 200);

    useEffect(() => {
        const target = inputRef.current;

        if (!target) {
            return undefined;
        }

        onResize(target);

        const observer = new ResizeObserver(() => {
            if (inputRef.current) {
                onResize(inputRef.current);
            }
        });

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [inputRef, onResize, values]);

    const hiddenChildren = createHiddenValueNodes(values);
    const className = ['dsb__overflow__count', count > 0 && 'show-count', 'center-counter']
        .filter(Boolean)
        .join(' ');

    return { count, className, hiddenChildren };
};

export const useOverflowCountPadding = ({
    inputRef,
    hiddenRef,
    countRef,
    values,
}: {
    inputRef: React.RefObject<HTMLInputElement | null>;
    hiddenRef: React.RefObject<HTMLParagraphElement | null>;
    countRef: React.RefObject<HTMLParagraphElement | null>;
    values: unknown[];
}) => {
    const originalPaddingRef = useRef<number | null>(null);

    useEffect(() => {
        const recalculatePadding = () => {
            if (!hiddenRef.current || !inputRef.current || !countRef.current) {
                return;
            }

            const styles = globalThis.getComputedStyle(inputRef.current, null);

            if (originalPaddingRef.current === null) {
                originalPaddingRef.current =
                    Number.parseFloat(styles.getPropertyValue('padding-right')) || 16;
            }

            const counterRect = countRef.current.getBoundingClientRect();
            const counterWidth = counterRect.width || 0;
            const basePadding = originalPaddingRef.current;

            inputRef.current.style.paddingRight = `${counterWidth + basePadding + 4}px`;
            countRef.current.style.lineHeight = styles.getPropertyValue('line-height');
            countRef.current.style.right = `${6 + basePadding}px`;
        };

        recalculatePadding();

        return () => {
            if (inputRef.current && originalPaddingRef.current !== null) {
                inputRef.current.style.paddingRight = `${originalPaddingRef.current}px`;
            }
        };
    }, [countRef, hiddenRef, inputRef, values]);
};
