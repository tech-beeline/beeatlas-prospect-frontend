import { useEffect, useRef, useState } from 'react';

const findScrollParent = (element: HTMLElement) => {
    let parent = element.parentElement;

    while (parent) {
        const style = window.getComputedStyle(parent);
        const hasScrollableOverflow = /(auto|scroll|overlay)/.test(style.overflowY);

        if (hasScrollableOverflow && parent.scrollHeight > parent.clientHeight) {
            return parent;
        }
        parent = parent.parentElement;
    }

    return null;
};

const scrollToCenterOfViewport = (element: HTMLDivElement | null) => {
    if (!element) {
        return;
    }

    const scrollParent = findScrollParent(element);

    if (scrollParent) {
        const parentRect = scrollParent.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const targetTop =
            scrollParent.scrollTop +
            (elementRect.top - parentRect.top) -
            scrollParent.clientHeight / 2 +
            elementRect.height / 2;

        scrollParent.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth',
        });
        return;
    }

    const rect = element.getBoundingClientRect();
    const targetTop = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;

    window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
    });
};

interface IUseScrollToSelectedEntityParams {
    selectionKey: string;
    shouldAutoExpand: boolean;
    scrollToGroupRow: boolean;
    scrollToChildId: number | null;
}

export const useScrollToSelectedEntity = ({
    selectionKey,
    shouldAutoExpand,
    scrollToGroupRow,
    scrollToChildId,
}: IUseScrollToSelectedEntityParams) => {
    const groupRowRef = useRef<HTMLDivElement | null>(null);
    const childRowRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSelectedEntityHandled, setIsSelectedEntityHandled] = useState(false);

    useEffect(() => {
        setIsSelectedEntityHandled(false);
    }, [selectionKey]);

    useEffect(() => {
        if (!shouldAutoExpand) {
            return;
        }

        if (!isSelectedEntityHandled && !isExpanded) {
            setIsExpanded(true);
        }
    }, [shouldAutoExpand, isExpanded, isSelectedEntityHandled]);

    useEffect(() => {
        if (!isExpanded) {
            return;
        }

        if (scrollToGroupRow) {
            setIsSelectedEntityHandled(true);
            requestAnimationFrame(() => scrollToCenterOfViewport(groupRowRef.current));
            const timer = window.setTimeout(() => {
                scrollToCenterOfViewport(groupRowRef.current);
            }, 120);
            return () => window.clearTimeout(timer);
        }

        if (scrollToChildId != null) {
            setIsSelectedEntityHandled(true);
            requestAnimationFrame(() =>
                scrollToCenterOfViewport(childRowRefs.current[scrollToChildId]),
            );
            const timer = window.setTimeout(() => {
                scrollToCenterOfViewport(childRowRefs.current[scrollToChildId]);
            }, 120);
            return () => window.clearTimeout(timer);
        }
    }, [isExpanded, scrollToGroupRow, scrollToChildId]);

    return {
        groupRowRef,
        childRowRefs,
        isExpanded,
        setIsExpanded,
    };
};
