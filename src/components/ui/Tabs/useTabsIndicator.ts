import { useEffect, useMemo, useState } from 'react';

import type { TabsIndicatorStyle } from './types';

export const useTabsIndicator = (
    currentTabElement: HTMLDivElement | null,
    previousTabElement: HTMLDivElement | null,
    tabsContainer: HTMLDivElement | null,
    scrollLeft: number,
): TabsIndicatorStyle => {
    const currentTabLeft = useMemo(() => currentTabElement?.offsetLeft ?? 0, [currentTabElement]);
    const currentTabWidth = useMemo(() => currentTabElement?.offsetWidth ?? 0, [currentTabElement]);
    const previousTabLeft = useMemo(
        () => previousTabElement?.offsetLeft ?? 0,
        [previousTabElement],
    );
    const previousTabWidth = useMemo(
        () => previousTabElement?.offsetWidth ?? 0,
        [previousTabElement],
    );
    const [tabsContainerWidth, setTabsContainerWidth] = useState(0);

    useEffect(() => {
        if (!tabsContainer) {
            return undefined;
        }

        const resizer = new ResizeObserver((entries) => {
            for (const { contentRect } of entries) {
                setTabsContainerWidth((prev) =>
                    prev === contentRect.width ? prev : contentRect.width,
                );
            }
        });

        resizer.observe(tabsContainer);

        return () => {
            resizer.unobserve(tabsContainer);
        };
    }, [tabsContainer]);

    return useMemo(() => {
        if (!previousTabElement) {
            return {
                left: currentTabLeft - scrollLeft,
                width: currentTabWidth,
            };
        }

        if (previousTabLeft < currentTabLeft) {
            return {
                left: previousTabLeft - scrollLeft,
                width: 'auto' as const,
                right: tabsContainerWidth - (currentTabLeft - scrollLeft + currentTabWidth),
            };
        }

        if (previousTabLeft > currentTabLeft) {
            return {
                left: currentTabLeft - scrollLeft,
                width: 'auto' as const,
                right: tabsContainerWidth - (previousTabLeft - scrollLeft + previousTabWidth),
            };
        }

        if (previousTabLeft === currentTabLeft) {
            return {
                left: currentTabLeft - scrollLeft,
                width: 'auto' as const,
                right: tabsContainerWidth - (currentTabLeft - scrollLeft + currentTabWidth),
            };
        }

        return {
            left: currentTabLeft - scrollLeft,
            width: currentTabWidth,
        };
    }, [
        previousTabWidth,
        previousTabLeft,
        currentTabWidth,
        currentTabLeft,
        tabsContainerWidth,
        scrollLeft,
        previousTabElement,
    ]);
};
