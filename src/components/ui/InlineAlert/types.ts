import type { HTMLAttributes, ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export type InlineAlertColorVariants = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export interface InlineAlertProps extends HTMLAttributes<HTMLDivElement> {
    /** Тип алерта, определяет его цвет и цвет иконки */
    type?: InlineAlertColorVariants;
    /** Название иконки */
    iconName?: Icons;
    /** Пользовательский класс */
    className?: string;
    children?: ReactNode;
}

export interface StyledInlineAlertProps {
    $type: InlineAlertColorVariants;
}
