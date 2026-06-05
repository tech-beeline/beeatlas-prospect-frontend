import type { ReactElement, ReactNode, RefObject } from 'react';

import type { TextFieldProps } from '../TextField/types';

type TextFieldPropsOmit = Omit<TextFieldProps, 'onChange' | 'value'>;

export type SelectDropDownPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
export interface Option<T = unknown> {
    value: T;
    id: string | number;
    disabled?: boolean;
}

export interface PrivateOption<T> {
    id: number;
    value: T;
    disabled?: boolean;
}

export enum CheckboxType {
    UNCHECKED = 0,
    PARTIALLY = 1,
    CHECKED = 2,
}

export interface SelectPropsBase<T> {
    onClose?: () => void;
    onOpen?: () => void;
    open?: boolean;
    renderValue?: (values: T[]) => string;
    dropdownClassName?: string;
    multiple?: boolean;
    filterPlaceholder?: string;
    filterFunction?: (
        options: Array<PrivateOption<T>>,
        filterValue: string,
    ) => Array<PrivateOption<T>>;
    onChange: (values: T[], changedItem?: T) => void;
    options: T[];
    values: T[];
    onManualClickOption?: (option: T) => void;
    onOutsideClick?: () => void;
    makeOption?: (option: T, selected?: boolean) => ReactElement;
    loading?: boolean;
    /** @deprecated */
    loadingText?: string | ReactNode;
    loadingContent?: string | ReactNode;
    applicationRootElementID?: string;
    dropdownElementID?: string;
    showTooltip?: boolean;
    noOptionsText?: string;
    selectAllText?: string;
    enableKeyboardNavigation?: boolean;
    isShowCountOfValues?: boolean;
    filter?: boolean;
    selectAll?: boolean;
    overlayScroll?: boolean;
    shouldRenderOverlay?: boolean;
    overlayClassName?: string;
    alignDropDown?: SelectDropDownPlacement;
    makeOptionWrapper?: (
        option: T,
        selected?: boolean,
        defaultProps?: {
            key: string | number;
            className: string;
            onClick: () => void;
            children: ReactElement;
        },
    ) => ReactElement;
    compareBy?: string | ((a: T, b: T) => boolean);
    hideDropDown?: boolean;
    disableMobileBottomSheet?: boolean;
    groups?: Array<Option<string>>;
}

export type SelectProps<T> = TextFieldPropsOmit & SelectPropsBase<T>;

export interface SelectDropdownProps<T> {
    isOpen: boolean;
    parentRef: RefObject<HTMLElement | null>;
    dropdownRef?: RefObject<HTMLDivElement | null>;
    applicationRootElementID?: string;
    dropdownElementID?: string;
    dropdownClassName?: string;
    onOutsideClick?: () => void;
    handleSetOpen?: (open: boolean) => void;
    dataTestId?: string;
    children: ReactNode;
}

export interface SelectDropDownContentProps<T> {
    selectedItems: PrivateOption<T>[];
    optionsData: PrivateOption<T>[];
    selectAll?: boolean;
    filter?: boolean;
    filterValue: string;
    filterFunction?: (
        options: Array<PrivateOption<T>>,
        filterValue: string,
    ) => Array<PrivateOption<T>>;
    filterPlaceholder?: string;
    filterRef: RefObject<HTMLInputElement | null>;
    changeFilterValue: (value: string) => void;
    multiple?: boolean;
    onMultiselectItem: (item: PrivateOption<T>) => () => void;
    onManualClickOption?: (option: T) => void;
    onSelectItem: (item: PrivateOption<T>) => () => void;
    focusedIndex: number;
    handleSelectAll: () => void;
    makeOption?: (option: T, selected?: boolean) => ReactElement;
    showTooltip?: boolean;
    selectAllText?: string;
    loading?: boolean;
    loadingText?: string | ReactNode;
    loadingContent?: string | ReactNode;
    noOptionsText?: string;
    optionsRef: RefObject<HTMLDivElement | null>;
    selectStatus: CheckboxType;
    makeOptionWrapper?: SelectProps<T>['makeOptionWrapper'];
    groups?: Array<Option<string>>;
    dataTestId?: string;
    selectRef?: RefObject<HTMLDivElement | null>;
}
