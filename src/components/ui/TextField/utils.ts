import { type ChangeEvent, type ReactElement, cloneElement } from 'react';

import {
    DEFAULT_AUTO_COMPLETE,
    DEFAULT_DATA_TEST_ID,
    DEFAULT_HELPER_POSITION,
    DEFAULT_TEXT_FIELD_SIZE,
} from './const';
import type { TextFieldProps, TextFieldSizeVariantsType } from './types';

type ClassValue = string | false | null | undefined | 0;

export const classNames = (...values: ClassValue[]) => values.filter(Boolean).join(' ');

export const createInputId = (inputId?: string) => inputId || `dsb_textfield-id-${Math.random()}`;

export const getValueLength = (value: TextFieldProps['value']) =>
    value === undefined ? 0 : String(value).length;

export const createChangeHandler = ({
    disabled,
    disableMaxLength,
    maxLength,
    onChange,
    setValueLength,
}: {
    disabled?: boolean;
    disableMaxLength?: boolean;
    maxLength?: number;
    onChange?: TextFieldProps['onChange'];
    setValueLength: (length: number) => void;
}) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
        if (disabled || !onChange) {
            return;
        }

        if (!disableMaxLength && maxLength !== undefined && event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
        }

        setValueLength(event.target.value.length);
        onChange(event);
    };
};

export const cloneCounter = ({
    counter,
    size,
    label,
    value,
}: {
    counter?: ReactElement;
    size: TextFieldSizeVariantsType;
    label?: string;
    value?: TextFieldProps['value'];
}) => {
    if (!counter) {
        return null;
    }

    return cloneElement(counter, {
        className: classNames(
            counter.props.className,
            value && `dsb_input--${size}`,
            label && 'dsb_input--labeled',
            label && size !== 'small' && 'dsb_input-placeholder--hide',
        ),
    });
};

export const resolveTextFieldDefaults = (props: TextFieldProps) => ({
    size: props.size ?? DEFAULT_TEXT_FIELD_SIZE,
    autoComplete: props.autoComplete ?? DEFAULT_AUTO_COMPLETE,
    fullWidth: props.fullWidth ?? false,
    error: props.error ?? false,
    disabled: props.disabled ?? false,
    dataTestId: props.dataTestId ?? DEFAULT_DATA_TEST_ID,
    helperPosition: props.helperPosition ?? DEFAULT_HELPER_POSITION,
    isClickableAdornment: props.isClickableAdornment ?? true,
    placeholderValue: props.placeholder || ' ',
    showBlock: (props.helperPosition ?? DEFAULT_HELPER_POSITION) === 'block',
    showAbs: (props.helperPosition ?? DEFAULT_HELPER_POSITION) === 'absolute',
});

export type ResolvedTextFieldDefaults = ReturnType<typeof resolveTextFieldDefaults>;

export const getInputClassName = ({
    error,
    size,
    startAdornment,
    endAdornment,
    isFocused,
    label,
    inputClassName,
}: {
    error: boolean;
    size: TextFieldSizeVariantsType;
    startAdornment?: TextFieldProps['startAdornment'];
    endAdornment?: TextFieldProps['endAdornment'];
    isFocused?: boolean;
    label?: string;
    inputClassName?: string;
}) =>
    classNames(
        'dsb_input',
        error && 'dsb_input--error',
        `dsb_input--${size}`,
        startAdornment && 'dsb_input--start-adornment',
        endAdornment && 'dsb_input--end-adornment',
        isFocused && 'dsb_input--focus',
        label && 'dsb_input--labeled',
        label && size !== 'small' && 'dsb_input-placeholder--hide',
        inputClassName,
    );

export const getLabelClassName = ({
    size,
    startAdornment,
    endAdornment,
}: {
    size: TextFieldSizeVariantsType;
    startAdornment?: TextFieldProps['startAdornment'];
    endAdornment?: TextFieldProps['endAdornment'];
}) =>
    classNames(
        'dsb_input-label',
        `dsb_input-label--${size}`,
        startAdornment && 'dsb_input-label--start-adornment',
        endAdornment && 'dsb_input-label--end-adornment',
    );

export const getWrapperClassName = ({
    fullWidth,
    disabled,
    className,
    wrapperClassName,
}: {
    fullWidth: boolean;
    disabled: boolean;
    className?: string;
    wrapperClassName?: string;
}) =>
    classNames(
        'dsb_text-field-wrapper',
        fullWidth && 'dsb_text-field-wrapper--fullwidth',
        disabled && 'dsb_text-field-wrapper--disabled',
        className,
        wrapperClassName,
    );

export const getInputWrapperClassName = ({
    isFocused,
    error,
}: {
    isFocused?: boolean;
    error: boolean;
}) =>
    classNames(
        'dsb_input-wrapper',
        isFocused && 'dsb_input-wrapper--focus',
        error && 'dsb_input-wrapper--error',
    );

export const shouldShowMaxLengthCounter = ({
    disableMaxLength,
    maxLength,
}: {
    disableMaxLength?: boolean;
    maxLength?: number;
}) => !disableMaxLength && maxLength !== undefined;
