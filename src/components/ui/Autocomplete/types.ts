import type { ReactElement, ReactNode } from 'react';
import type { Placement } from '@floating-ui/react';

import type { SearchProps, SearchSizeVariantsType } from '../Search/types';
import type { Option } from '../Select/types';
import type { TextFieldProps, TextFieldSizeVariantsType } from '../TextField/types';

type SearchPropsOmit = Omit<SearchProps, 'onChange' | 'value' | 'size'>;
type TextFieldPropsOmit = Omit<
    TextFieldProps,
    'onChange' | 'value' | 'size' | 'type' | 'startAdornment' | 'prefix' | 'suffix'
>;

export interface AutocompleteProps<T = string> extends SearchPropsOmit, TextFieldPropsOmit {
    size?: TextFieldSizeVariantsType | SearchSizeVariantsType;
    onChange: (value: Option<T>) => void;
    onClose?: () => void;
    onOpen?: () => void;
    open?: boolean;
    options: Array<Option<T>>;
    value: Option<T> | null;
    defaultGroupID?: string;
    dropdownClassName?: string;
    dropdownElementID?: string;
    applicationRootElementID?: string;
    renderValue: (value: Option<T>) => string;
    onInputChange: (inputValue: string) => void;
    onInputClear: () => void;
    enableGrouping?: boolean;
    makeOption?: (option: Option<T>, inputValue: string) => ReactElement | null;
    type: 'search' | 'select';
    /** @deprecated Используйте `noOptionsContents` */
    noOptionsText?: string | ReactNode;
    noOptionsContents?: string | ReactNode;
    loading?: boolean;
    /** @deprecated Используйте `loadingContent` */
    loadingText?: string | ReactNode;
    loadingContent?: string | ReactNode;
    hideDropDown?: boolean;
    showTooltip?: boolean;
    enableKeyboardNavigation?: boolean;
    maskConfig?: unknown;
    overlayScroll?: boolean;
    shouldRenderOverlay?: boolean;
    overlayClassName?: string;
    alignDropDown?: Placement;
    mobileTitle?: string;
    mobileCaption?: string;
    classNameMobileModal?: string;
    disableMaxLength?: boolean;
    dataTestId?: string;
}
