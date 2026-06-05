import type { InputHTMLAttributes, KeyboardEvent, ReactElement, ReactNode } from 'react';

export type TextFieldSizeVariantsType = 'small' | 'medium' | 'large';

export type HelperPositionType = 'absolute' | 'block';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    inputId?: string;
    inputClassName?: string;
    wrapperClassName?: string;
    size?: TextFieldSizeVariantsType;
    error?: boolean;
    disabled?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    helperPosition?: HelperPositionType;
    isClickableAdornment?: boolean;
    counter?: ReactElement;
    maxLength?: number;
    disableMaxLength?: boolean;
    isFocused?: boolean;
    isShowCountOfValues?: boolean;
    dataTestId?: string;
}
