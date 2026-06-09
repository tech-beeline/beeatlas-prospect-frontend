import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { BreadcrumbsItem } from './BreadcrumbsItem';
import type { BreadcrumbsProps } from './types';
import * as S from './units';
import { normalizeChildren } from './utils';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
    children,
    collapsed = false,
    className,
    value,
}) => {
    const [isCollapsed, setCollapsed] = useState(collapsed);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setCollapsed(collapsed);
    }, [collapsed]);

    const handleClickAway = useCallback(() => {
        if (collapsed) {
            setCollapsed(true);
        }
    }, [collapsed]);

    const handleClickDots = () => {
        setCollapsed(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                handleClickAway();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickAway]);

    const renderSeparator = (key: string | number) => (
        <S.Separator key={key} className="dsb-breadcrumbs__separator">
            <S.SeparatorIcon
                className="beeline-icons dsb_icon dsb_icon--small dsb-breadcrumbs__separator-icon"
                role="img"
                translate="no"
            >
                {Icons.NavArrowRight}
            </S.SeparatorIcon>
        </S.Separator>
    );

    const renderListItems = (items: React.ReactNode[]) => {
        const childrenLength = items.length;

        if (!isCollapsed || childrenLength < 3) {
            return items.flatMap((link, index) => {
                const nodes = [
                    <S.Item
                        key={`item-${index}`}
                        className="dsb-breadcrumbs__item"
                        itemProp="itemListElement"
                        itemScope
                    >
                        {link}
                        <meta itemProp="position" content={String(index + 1)} />
                    </S.Item>,
                ];

                if (index < childrenLength - 1) {
                    nodes.push(renderSeparator(`separator-${index}`));
                }

                return nodes;
            });
        }

        return [
            <S.Item
                key="collapsed-first"
                className="dsb-breadcrumbs__item"
                itemProp="itemListElement"
                itemScope
            >
                {items[0]}
                <meta itemProp="position" content="1" />
            </S.Item>,
            renderSeparator('collapsed-separator-first'),
            <S.Dots
                key="collapsed-dots"
                type="button"
                className="dsb-breadcrumbs__dots"
                onClick={handleClickDots}
            >
                ...
            </S.Dots>,
            renderSeparator('collapsed-separator-second'),
            <S.Item key="collapsed-last" className="dsb-breadcrumbs__item" itemScope>
                {items[childrenLength - 1]}
                <meta itemProp="position" content={String(childrenLength)} />
            </S.Item>,
        ];
    };

    const content = value
        ? renderListItems(
              value.map((item, index) => (
                  <BreadcrumbsItem key={index} {...item} index={String(index)} />
              )),
          )
        : renderListItems(normalizeChildren(children));

    return (
        <S.Nav
            ref={navRef}
            data-testid="Breadcrumbs"
            className={['dsb-breadcrumbs', className].filter(Boolean).join(' ')}
            aria-label="Breadcrumb"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
        >
            <S.List className="dsb-breadcrumbs__list">{content}</S.List>
        </S.Nav>
    );
};

Breadcrumbs.displayName = 'Breadcrumbs';
