import React, { cloneElement, FC } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { BreadcrumbsItemProps } from './types';
import * as S from './units';

const itemClassName = (currentPage?: boolean) =>
    ['dsb-breadcrumbs__item-builtin', currentPage && 'dsb-breadcrumbs__item-builtin-current']
        .filter(Boolean)
        .join(' ');

export const BreadcrumbsItem: FC<BreadcrumbsItemProps> = ({
    label,
    href,
    routingComponent,
    tooltipText,
    currentPage,
    menu,
}) => {
    const handleClick = () => {
        menu?.onItemClick();
    };

    if (routingComponent) {
        return cloneElement(routingComponent, {
            itemProp: 'name',
            className: [itemClassName(currentPage), routingComponent.props.className]
                .filter(Boolean)
                .join(' '),
            title: tooltipText,
            onClick: (event: React.MouseEvent) => {
                routingComponent.props.onClick?.(event);
                handleClick();
            },
        });
    }

    if (currentPage || !href) {
        return (
            <S.ItemBuiltinSpan
                itemProp="name"
                className={itemClassName(true)}
                $currentPage
                title={tooltipText}
            >
                {label}
                {menu && (
                    <S.MenuIcon
                        className="beeline-icons dsb_icon dsb_icon--small"
                        translate="no"
                        onClick={handleClick}
                    >
                        {Icons.ArrowDropDown}
                    </S.MenuIcon>
                )}
            </S.ItemBuiltinSpan>
        );
    }

    return (
        <S.ItemBuiltin
            itemProp="name"
            href={href}
            className={itemClassName(false)}
            $currentPage={false}
            title={tooltipText}
            onClick={handleClick}
        >
            {label}
            {menu && (
                <S.MenuIcon className="beeline-icons dsb_icon dsb_icon--small" translate="no">
                    {Icons.ArrowDropDown}
                </S.MenuIcon>
            )}
        </S.ItemBuiltin>
    );
};

BreadcrumbsItem.displayName = 'BreadcrumbsItem';
