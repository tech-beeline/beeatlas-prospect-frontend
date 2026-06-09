import React, { Fragment, useMemo } from 'react';

import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { Divider } from '../Divider';
import { Typography } from '../Typography';

import { NAVIGATION_DRAWER_TOOLTIP_ID } from './const';
import { NavigationItemSkeleton } from './NavigationItemSkeleton';
import type { NavigationDrawerListProps } from './types';
import * as S from './units';
import { classNames } from './utils';

export const NavigationDrawerList = ({
    lists,
    prevItemsCount = -1,
    level = 0,
    isGroupTitle,
    isGroupDivider,
    isExpanded,
    activeItem,
    expandedItems,
    recentlyLoadedItems,
    onItemClick,
    onToggleExpanded,
    onOpen,
    isControlled,
    setIsExpanded,
    wrapWithList = true,
}: NavigationDrawerListProps) => {
    const nodes = useMemo(() => {
        const result: React.ReactNode[] = [];
        let itemAnimationDelayCounter = prevItemsCount;

        if (!lists) {
            return result;
        }

        for (const [index, { title, items }] of lists.entries()) {
            result.push(
                <div className="list__wrapper" role="menu" key={index}>
                    {isGroupTitle && title && level === 0 && (
                        <div className="list__wrapper-title">
                            <Typography variant="overline">{title}</Typography>
                        </div>
                    )}
                    {items?.map((item) => {
                        itemAnimationDelayCounter += 1;

                        if (item.isLoading) {
                            return (
                                <NavigationItemSkeleton
                                    key={item.name}
                                    isChild={level > 0}
                                    animated
                                />
                            );
                        }

                        const hasChildren = Boolean(item.children?.length);
                        const isItemExpanded = expandedItems[item.path];
                        const isItemActive = item.path === activeItem;
                        const isChildActive =
                            level === 0 && hasChildren
                                ? item.children?.some((child) => child.path === activeItem) ?? false
                                : false;
                        const itemKey = level > 0 ? `${item.path}-${item.path}` : item.path;
                        const shouldAnimate = recentlyLoadedItems.has(itemKey);

                        const commonProps = {
                            className: classNames('list__wrapper-item', {
                                'list__wrapper-item--active':
                                    (isItemActive || isChildActive) && !item.disableActive,
                                'list__wrapper-item--child': level > 0,
                                'navigation-item-fade-in': shouldAnimate,
                            }),
                            tabIndex: 0,
                            role: 'menuitem' as const,
                            'aria-label': item.name,
                            'aria-selected': (isItemActive || isChildActive) && !item.disableActive,
                            ...(hasChildren && { 'aria-expanded': isItemExpanded }),
                        };

                        const content = (
                            <Fragment>
                                {(isItemActive || isChildActive) && !item.disableActive && (
                                    <span className="indicator" />
                                )}
                                <Fragment>
                                    {level === 0 && item.icon && (
                                        <Icon
                                            className="icon"
                                            size="large"
                                            iconName={item.icon}
                                            {...(!isExpanded && {
                                                'data-tooltip-id': NAVIGATION_DRAWER_TOOLTIP_ID,
                                                'data-tooltip-content': item.name,
                                            })}
                                        />
                                    )}
                                    <span
                                        className="list__wrapper-item-text"
                                        style={{
                                            transitionDelay: isExpanded
                                                ? `${itemAnimationDelayCounter * 50}ms`
                                                : '0ms',
                                        }}
                                    >
                                        <Typography className="typography" variant="body3">
                                            {item.name}
                                        </Typography>
                                    </span>
                                    {hasChildren && (
                                        <Icon
                                            className={classNames('expand-icon', {
                                                'expand-icon--expanded': isItemExpanded,
                                            })}
                                            size="medium"
                                            iconName={Icons.NavArrowDown}
                                        />
                                    )}
                                </Fragment>
                            </Fragment>
                        );

                        const itemNodes: React.ReactNode[] = [];

                        if (item.href && !hasChildren) {
                            itemNodes.push(
                                <Typography
                                    key={item.name}
                                    variant="nativeLink"
                                    {...commonProps}
                                    href={item.href}
                                    onClick={() => onItemClick(item.path, level)}
                                    {...(item.target && { target: item.target })}
                                    {...(item.rel && { rel: item.rel })}
                                >
                                    {content}
                                </Typography>,
                            );
                        } else {
                            itemNodes.push(
                                <button
                                    key={item.name}
                                    type="button"
                                    {...commonProps}
                                    disabled={item.disabled}
                                    onClick={() => {
                                        if (hasChildren) {
                                            if (!isExpanded) {
                                                if (isControlled) {
                                                    onOpen?.();
                                                } else {
                                                    setIsExpanded(true);
                                                }
                                            }
                                            onToggleExpanded(item.path);
                                            return;
                                        }

                                        onItemClick(item.path, level);
                                    }}
                                >
                                    {content}
                                </button>,
                            );
                        }

                        if (hasChildren && level < 1) {
                            const childGroups = [{ items: item.children ?? [] }];
                            itemNodes.push(
                                <div
                                    key={`${item.name}-children`}
                                    className={classNames('list__wrapper-children', {
                                        'list__wrapper-children--collapsed':
                                            !isItemExpanded || !isExpanded,
                                    })}
                                >
                                    <NavigationDrawerList
                                        lists={childGroups}
                                        prevItemsCount={itemAnimationDelayCounter}
                                        level={level + 1}
                                        isGroupTitle={isGroupTitle}
                                        isGroupDivider={isGroupDivider}
                                        isExpanded={isExpanded}
                                        activeItem={activeItem}
                                        expandedItems={expandedItems}
                                        recentlyLoadedItems={recentlyLoadedItems}
                                        onItemClick={onItemClick}
                                        onToggleExpanded={onToggleExpanded}
                                        onOpen={onOpen}
                                        isControlled={isControlled}
                                        setIsExpanded={setIsExpanded}
                                        wrapWithList={false}
                                    />
                                </div>,
                            );
                        }

                        return itemNodes;
                    })}
                </div>,
            );

            if (isGroupDivider && index !== lists.length - 1 && level === 0) {
                result.push(
                    <div className="list__divider" key={`divider${index}`}>
                        <Divider />
                    </div>,
                );
            }
        }

        return result;
    }, [
        activeItem,
        expandedItems,
        isControlled,
        isExpanded,
        isGroupDivider,
        isGroupTitle,
        level,
        lists,
        onItemClick,
        onOpen,
        onToggleExpanded,
        prevItemsCount,
        recentlyLoadedItems,
        setIsExpanded,
    ]);

    return wrapWithList ? <S.ListContent className="list">{nodes}</S.ListContent> : <>{nodes}</>;
};
