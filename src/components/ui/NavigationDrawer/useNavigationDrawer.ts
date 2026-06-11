import { useCallback, useEffect, useRef, useState } from 'react';

import { LOADING_ANIMATION_DURATION_MS } from './const';
import type { GroupItem, Groups } from './types';

interface UseNavigationDrawerParams {
    active?: string;
    bottom?: Groups[];
    defaultExpandedItems?: Record<string, boolean>;
    expandedItems?: Record<string, boolean>;
    groups: Groups[];
    isOpen?: boolean;
    isExtraSmallDevice: boolean;
    onClickItem?: (name: string) => void;
    onClose?: () => void;
    onExpandedItemsChange?: (expandedItems: Record<string, boolean>) => void;
    onOpen?: () => void;
}

export const useNavigationDrawer = ({
    active,
    bottom,
    defaultExpandedItems = {},
    expandedItems: expandedItemsProp,
    groups,
    isOpen = false,
    isExtraSmallDevice,
    onClickItem,
    onClose,
    onExpandedItemsChange,
    onOpen,
}: UseNavigationDrawerParams) => {
    const openCallback: (() => void) | undefined = onOpen;
    const closeCallback: (() => void) | undefined = onClose;
    const isControlled = openCallback !== undefined || closeCallback !== undefined;
    const openCallbackRef = useRef(openCallback);
    const closeCallbackRef = useRef(closeCallback);

    openCallbackRef.current = openCallback;
    closeCallbackRef.current = closeCallback;
    const [internalIsExpanded, setInternalIsExpanded] = useState(isOpen);
    const isExpanded = isControlled ? isOpen : internalIsExpanded;

    const setIsExpanded = useCallback(
        (value: boolean | ((prev: boolean) => boolean)) => {
            if (!isControlled) {
                setInternalIsExpanded(value);
            }
        },
        [isControlled],
    );

    const [activeItem, setActiveItem] = useState(() => active ?? '');

    const isExpandedItemsControlled =
        expandedItemsProp !== undefined && onExpandedItemsChange !== undefined;
    const [internalExpandedItems, setInternalExpandedItems] =
        useState<Record<string, boolean>>(defaultExpandedItems);
    const expandedItems = isExpandedItemsControlled
        ? expandedItemsProp ?? {}
        : internalExpandedItems;

    const [recentlyLoadedItems, setRecentlyLoadedItems] = useState<Set<string>>(new Set());
    const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
    const prevLoadingState = useRef<Map<string, boolean>>(new Map());

    useEffect(() => {
        if (!isExtraSmallDevice || isControlled) {
            return;
        }

        setInternalIsExpanded(isOpen);
    }, [isExtraSmallDevice, isOpen, isControlled]);

    useEffect(() => {
        if (isControlled) {
            return;
        }

        setInternalIsExpanded(isOpen);
    }, [isOpen, isControlled]);

    useEffect(() => {
        if (isControlled) {
            return;
        }

        if (internalIsExpanded) {
            openCallbackRef.current?.();
        } else {
            closeCallbackRef.current?.();
        }
    }, [internalIsExpanded, isControlled]);

    useEffect(() => {
        setActiveItem(active ?? '');
    }, [active]);

    useEffect(() => {
        const checkLoadingItems = (items: GroupItem[], parentPath = '') => {
            items.forEach((item: GroupItem) => {
                const itemKey = `${parentPath}${item.path}`;
                const wasLoading = prevLoadingState.current.get(itemKey);
                const isCurrentlyLoading = item.isLoading;

                prevLoadingState.current.set(itemKey, !!isCurrentlyLoading);

                if (wasLoading && !isCurrentlyLoading) {
                    setRecentlyLoadedItems((prev) => new Set([...prev, itemKey]));

                    const existingTimeout = timeoutRefs.current.get(itemKey);
                    if (existingTimeout) {
                        clearTimeout(existingTimeout);
                    }

                    const timeout = setTimeout(() => {
                        setRecentlyLoadedItems((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(itemKey);
                            return newSet;
                        });
                        timeoutRefs.current.delete(itemKey);
                    }, LOADING_ANIMATION_DURATION_MS);

                    timeoutRefs.current.set(itemKey, timeout);
                }

                if (item.children) {
                    checkLoadingItems(item.children, `${itemKey}-`);
                }
            });
        };

        groups.forEach((group) => checkLoadingItems(group.items));
        bottom?.forEach((group) => checkLoadingItems(group.items));

        return () => {
            timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
            timeoutRefs.current.clear();
        };
    }, [groups, bottom]);

    const handleItemClick = useCallback(
        (path: string) => {
            setActiveItem(path);
            onClickItem?.(path);
        },
        [onClickItem],
    );

    const handleToggleExpanded = useCallback(
        (path: string) => {
            const newExpanded = {
                ...expandedItems,
                [path]: !expandedItems[path],
            };

            if (isExpandedItemsControlled) {
                onExpandedItemsChange?.(newExpanded);
            } else {
                setInternalExpandedItems(newExpanded);
            }
        },
        [expandedItems, isExpandedItemsControlled, onExpandedItemsChange],
    );

    const handleTriggerButton = useCallback(() => {
        if (isControlled) {
            if (isExpanded) {
                closeCallbackRef.current?.();
            } else {
                openCallbackRef.current?.();
            }
            return;
        }

        setInternalIsExpanded((prev) => !prev);
    }, [isControlled, isExpanded]);

    return {
        activeItem,
        expandedItems,
        handleItemClick,
        handleToggleExpanded,
        handleTriggerButton,
        isControlled,
        isExpanded,
        recentlyLoadedItems,
        setIsExpanded,
    };
};
