import type {
    CSSProperties,
    InputHTMLAttributes,
    MouseEvent,
    ReactNode,
    Ref,
    RefObject,
} from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { IconSize } from '../Icon/types';

export type SearchSizeVariantsType = 'small' | 'medium';

export type SearchOption<T = string> = {
    id: T;
    value: string;
};

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    size?: SearchSizeVariantsType;
    fullWidth?: boolean;
    inputClassName?: string;
    onClear?: () => void;
    onSearch?: (value?: SearchProps['value']) => string | void;
    filterItems?: Array<SearchOption<string>>;
    selectedFilter?: SearchOption<string> | null;
    onFilterChange?: (filterItem: SearchOption<string> | null) => void;
    isAdaptive?: boolean;
    maskConfig?: unknown;
    dataTestId?: string;
}

export interface SearchIconButtonProps {
    iconName: Icons;
    className?: string;
    style?: CSSProperties;
    size?: IconSize;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    dataTestId?: string;
}

export interface ControlledSearchProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    inputRef: Ref<HTMLInputElement>;
    dataTestId: string;
    dataTestIconId: string;
    iconButton: SearchIconButtonProps;
    maskConfig?: unknown;
}

export interface SearchDropdownProps<T = string> {
    options: Array<SearchOption<T>>;
    values: Array<SearchOption<T>>;
    onChange: (values: Array<SearchOption<T>>) => void;
    onOutsideClick?: () => void;
    makeOption: (option: SearchOption<T>, selected: boolean) => ReactNode;
    parentRef: RefObject<HTMLElement | null>;
    isOpen?: boolean;
    handleSetOpen?: (open: boolean) => void;
    multiple?: boolean;
    dataTestId?: string;
}
