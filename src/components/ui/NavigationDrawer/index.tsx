import React, { useMemo } from 'react';

import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { Divider } from '../Divider';

import { NAVIGATION_DRAWER_TOOLTIP_ID } from './const';
import { NavigationDrawerList } from './NavigationDrawerList';
import type { NavigationDrawerProps } from './types';
import * as S from './units';
import { useNavigationDrawer } from './useNavigationDrawer';
import { classNames, useExtraSmallDevice } from './utils';

export const NavigationDrawer = ({
    className,
    groups,
    isGroupDivider = true,
    isGroupTitle = true,
    active,
    bottom,
    onClickItem,
    isOpen = false,
    mobileOnOutsideClick,
    onOpen,
    onClose,
    disableMobileView = false,
    expandedItems: expandedItemsProp,
    onExpandedItemsChange,
    defaultExpandedItems = {},
    ...props
}: NavigationDrawerProps) => {
    const isExtraSmallDevice = useExtraSmallDevice();

    const {
        activeItem,
        expandedItems,
        handleItemClick,
        handleToggleExpanded,
        handleTriggerButton,
        isControlled,
        isExpanded,
        recentlyLoadedItems,
        setIsExpanded,
    } = useNavigationDrawer({
        active,
        bottom,
        defaultExpandedItems,
        expandedItems: expandedItemsProp,
        groups,
        isOpen,
        isExtraSmallDevice,
        onClickItem,
        onClose,
        onExpandedItemsChange,
        onOpen,
    });

    const groupsItemsCount = useMemo(
        () => groups.reduce((total, group) => total + group.items.length, 0),
        [groups],
    );

    const listProps = {
        isGroupTitle,
        isGroupDivider,
        isExpanded,
        activeItem,
        expandedItems,
        recentlyLoadedItems,
        onItemClick: handleItemClick,
        onToggleExpanded: handleToggleExpanded,
        onOpen,
        isControlled,
        setIsExpanded,
    };

    const rootClassName = classNames(
        'dsb-navigation-drawer',
        { 'dsb-navigation-drawer--expanded': isExpanded },
        className,
        isExtraSmallDevice && !disableMobileView && 'dsb-navigation-drawer-mobile',
    );

    return (
        <S.GlobalNavigationDrawerStyles>
            {isExtraSmallDevice && isExpanded && !disableMobileView && (
                <S.Backdrop
                    className="dsb-navigation-drawer-backdrop"
                    onClick={mobileOnOutsideClick}
                />
            )}
            <S.DrawerRoot data-testid="NavigationDrawer" className={rootClassName} {...props}>
                <S.DrawerContainer className="dsb-navigation-drawer__container">
                    {(!isExtraSmallDevice || disableMobileView) && (
                        <S.TriggerButton className="trigger-button">
                            <IconButton
                                size="large"
                                iconName={isExpanded ? Icons.MenuOpen : Icons.Menu}
                                onClick={handleTriggerButton}
                            />
                        </S.TriggerButton>
                    )}
                    <S.ListTop className="list-top">
                        {groups && <NavigationDrawerList lists={groups} {...listProps} />}
                    </S.ListTop>
                    {bottom && (
                        <S.ListBottom className="list-bottom">
                            <div className="list">
                                <div className="list__divider">
                                    <Divider />
                                </div>
                                <NavigationDrawerList
                                    lists={bottom}
                                    prevItemsCount={groupsItemsCount}
                                    wrapWithList={false}
                                    {...listProps}
                                />
                            </div>
                        </S.ListBottom>
                    )}
                </S.DrawerContainer>
            </S.DrawerRoot>
            {!isExpanded && (
                <TooltipContainer
                    id={NAVIGATION_DRAWER_TOOLTIP_ID}
                    offset={8}
                    place="right"
                    noArrow
                    positionStrategy="fixed"
                />
            )}
        </S.GlobalNavigationDrawerStyles>
    );
};
