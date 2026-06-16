import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Заголовок */
    label: string;
    /** Признак активный / неактивный, влияет на фон */
    active?: boolean;
    /** Признак заблокирован / разблокирован */
    disabled?: boolean;
    /** Признак перемещаемый / статичный */
    dragged?: boolean;
    /** Компонент иконки, отображается в начале названия */
    startAdornment?: ReactNode;
    /** Компонент иконки, отображается в конце названия */
    endAdornment?: ReactNode;
    /** Пользовательский класс для обёртки (совместимость с DS) */
    rootClassName?: string;
    dataTestId?: string;
}

export interface StyledChipProps {
    $active: boolean;
    $disabled: boolean;
    $dragged: boolean;
    $clickable: boolean;
    $hasStartAdornment: boolean;
    $hasEndAdornment: boolean;
}
