import React, { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Divider } from '../Divider';

import { TabsScroller } from './TabsScroller';
import type { TabsProps, TabsScrollEvent } from './types';
import * as S from './units';
import { useTabs } from './useTabs';
import { useTabsIndicator } from './useTabsIndicator';

export const Tabs = ({
    className,
    divider,
    align,
    children,
    selectedTabIndex,
    onChange,
    bodyClassName,
    ...props
}: TabsProps) => {
    useEffect(() => {
        if (divider || align) {
            console.warn('[Tabs] Вы используете устареший пропс divider или align');
        }
    }, []);

    const [scrollLeft, setScrollLeft] = useState(0);
    const [headerElement, setHeaderElement] = useState<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);

    const handleTabsScroll = useCallback(({ scrollLeft: nextScrollLeft }: TabsScrollEvent) => {
        setScrollLeft((prev) => (prev === nextScrollLeft ? prev : nextScrollLeft));
    }, []);

    const setHeaderRef = useCallback((node: HTMLDivElement | null) => {
        if (headerRef.current === node) {
            return;
        }

        headerRef.current = node;
        setHeaderElement(node);
    }, []);

    const tabsChildren = useMemo(
        () => Children.toArray(children).filter(Boolean) as React.ReactElement[],
        [children],
    );

    const {
        tabs,
        currentTabData: { tabBody, tabElement: currentTabElement, tabProps },
        prevTabData: { tabElement: previousTabElement },
    } = useTabs({
        onChange,
        selectedTabIndex,
        tabs: tabsChildren,
    });

    const indicatorData = useTabsIndicator(
        currentTabElement,
        previousTabElement,
        headerElement,
        scrollLeft,
    );

    const rootClassName = ['dsb_tabs', className].filter(Boolean).join(' ');
    const bodyClassNames = ['dsb_tabs__body', tabProps?.bodyClassName, bodyClassName]
        .filter(Boolean)
        .join(' ');

    return (
        <S.TabsRoot data-testid="Tabs" className={rootClassName} {...props}>
            <S.TabsHeader className="dsb_tabs__header" ref={setHeaderRef}>
                <TabsScroller onScroll={handleTabsScroll} className="dsb_tabs__header-tabs">
                    {tabs}
                </TabsScroller>
                <Divider className="dsb_tabs__divider" />
                <S.TabsIndicator style={indicatorData} className="dsb_tabs__indicator" />
            </S.TabsHeader>
            <S.TabsBody className={bodyClassNames}>{tabBody}</S.TabsBody>
        </S.TabsRoot>
    );
};

Tabs.displayName = 'Tabs';
