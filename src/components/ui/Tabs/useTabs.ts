import type { ReactElement } from 'react';
import { cloneElement, useCallback, useEffect, useMemo, useState } from 'react';

import { Tab } from '../Tab';
import type { TabSelectedData } from '../Tab/types';

import type { TabData, UseTabsData, UseTabsParams } from './types';
import { useDebounceCallback } from './utils';

const emptyTabData: TabData = {
    tabBody: null,
    tabElement: null,
};

const isTabElement = (element: unknown): element is ReactElement => {
    if (!element || typeof element !== 'object' || !('type' in element)) {
        return false;
    }

    const { type } = element as ReactElement;

    return type === Tab || (type as { displayName?: string })?.displayName === 'Tab';
};

export const useTabs = ({ onChange, selectedTabIndex, tabs }: UseTabsParams): UseTabsData => {
    useEffect(() => {
        const tabWithSelected = tabs.filter(Boolean).find((tab) => 'selected' in tab.props);

        if (tabWithSelected) {
            console.warn(
                '[Tabs] Вы используете устареший пропс selected в дочернем компоненте Tab',
            );
        }
    }, []);

    const [_selectedTabIndex, setSelectedTabIndex] = useState(selectedTabIndex ?? 0);
    const [currentTabData, setCurrentTabData] = useState<TabData>(emptyTabData);
    const [prevTabData, setPrevTabData] = useState<TabData>(emptyTabData);

    const changeTab = useCallback(
        (targetTabIndex: number) => {
            if (_selectedTabIndex !== targetTabIndex) {
                setSelectedTabIndex(targetTabIndex);
                onChange?.(targetTabIndex);
            }
        },
        [onChange, _selectedTabIndex],
    );

    const [setPrevTabDataWithDebounce] = useDebounceCallback(setPrevTabData, 100);

    const enrichedTabs = useMemo(
        () =>
            tabs.filter(Boolean).map((tabComponent, tabIndex) => {
                if (!isTabElement(tabComponent)) {
                    return tabComponent;
                }

                const currentTabIndex = tabComponent.props.index ?? tabIndex;

                return cloneElement(tabComponent, {
                    ...tabComponent.props,
                    onClick: () => {
                        if (!tabComponent.props.disabled) {
                            changeTab(currentTabIndex);
                            tabComponent.props.onClick?.(tabComponent.props.value);
                        }
                    },
                    index: currentTabIndex,
                    selected: !tabComponent.props.disabled && currentTabIndex === _selectedTabIndex,
                    onSelected: (data: TabSelectedData) => {
                        setCurrentTabData((prev) => {
                            const nextData = { ...data, tabProps: tabComponent.props };

                            if (
                                prev.tabElement === nextData.tabElement &&
                                prev.tabBody === nextData.tabBody &&
                                prev.tabProps === nextData.tabProps
                            ) {
                                return prev;
                            }

                            return nextData;
                        });
                        setPrevTabDataWithDebounce(data);
                    },
                });
            }),
        [tabs, changeTab, _selectedTabIndex, setPrevTabDataWithDebounce],
    );

    useEffect(() => {
        if (typeof selectedTabIndex !== 'number') {
            return;
        }

        const tabsIndexes: number[] = [];
        const targetTab = enrichedTabs.find((tab) => {
            if (!isTabElement(tab)) {
                return false;
            }

            tabsIndexes.push(tab.props.index ?? 0);

            return tab.props.index === selectedTabIndex;
        });

        if (!targetTab) {
            console.warn(
                `[Tabs] Вы попытались выбрать таб с индексом ${selectedTabIndex}.`,
                'Таб с таким индексом отсутствует.',
                `Доступные индексы: ${tabsIndexes.join(', ')}`,
            );
        }

        if (isTabElement(targetTab) && !targetTab.props.disabled) {
            changeTab(targetTab.props.index ?? selectedTabIndex);
        }
    }, [selectedTabIndex, changeTab, enrichedTabs]);

    useEffect(() => {
        if (selectedTabIndex !== undefined) {
            return;
        }

        const firstEnabledChildIndex = enrichedTabs.find(
            (child) => isTabElement(child) && !child.props.disabled,
        )?.props.index;

        if (firstEnabledChildIndex !== undefined) {
            changeTab(firstEnabledChildIndex);
        }
    }, []);

    return {
        tabs: enrichedTabs,
        currentTabIndex: _selectedTabIndex,
        currentTabData,
        prevTabData,
    };
};
