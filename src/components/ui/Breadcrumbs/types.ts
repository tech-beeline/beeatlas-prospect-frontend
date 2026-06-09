import type { ReactElement, ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export interface BreadcrumbsProps {
    /** Признак свёрнут / развёрнут */
    collapsed?: boolean;
    /** Пользовательский класс */
    className?: string;
    /** Хлебные крошки — кастомные элементы или BreadcrumbsItem */
    children?: ReactNode | ReactNode[];
    /** Массив для построения хлебных крошек. Можно использовать children или value */
    value?: BreadcrumbsItemProps[];
}

export interface BreadcrumbsItemProps {
    label: string;
    href?: string;
    /**
     * Компонент ссылки для SPA-навигации.
     * При одновременном указании href и routingComponent приоритет имеет routingComponent.
     */
    routingComponent?: ReactElement;
    tooltipText?: string;
    menu?: {
        items: BreadcrumbsItemMenu[];
        isOpen: boolean;
        onOutsideClick: () => void;
        onItemClick: () => void;
    };
    currentPage?: boolean;
    index?: string;
}

export interface BreadcrumbsItemMenu {
    title: string;
    subtitle?: string;
    iconName?: Icons;
    onClick?: () => void;
    disabled?: boolean;
}

export interface StyledBreadcrumbsItemProps {
    $currentPage?: boolean;
}
