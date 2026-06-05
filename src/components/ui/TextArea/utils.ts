import {
    DEFAULT_DATA_TEST_ID,
    DEFAULT_HELPER_POSITION,
    DEFAULT_TEXT_AREA_SIZE,
    TEXTAREA_MARGIN,
    TEXTAREA_STANDARD_HEIGHT,
} from './const';
import type { TextAreaProps, TextAreaSize } from './types';

type ClassValue = string | false | null | undefined | 0;

export const classNames = (...values: ClassValue[]) => values.filter(Boolean).join(' ');

export const createTextareaId = (textareaId?: string) =>
    textareaId || `dsb_textfield-id-${Math.random()}`;

export const resolveTextAreaDefaults = (props: TextAreaProps) => ({
    size: props.size ?? DEFAULT_TEXT_AREA_SIZE,
    fullWidth: props.fullWidth ?? false,
    error: props.error ?? false,
    disabled: props.disabled ?? false,
    dataTestId: props.dataTestId ?? DEFAULT_DATA_TEST_ID,
    helperPosition: props.helperPosition ?? DEFAULT_HELPER_POSITION,
    placeholderValue: props.placeholder || ' ',
    showBlock: (props.helperPosition ?? DEFAULT_HELPER_POSITION) === 'block',
    showAbs:
        Boolean(props.helperText) &&
        (props.helperPosition ?? DEFAULT_HELPER_POSITION) === 'absolute',
});

export const getWrapperClassName = ({
    disabled,
    showAbs,
}: {
    disabled: boolean;
    showAbs: boolean;
}) =>
    classNames(
        'dsb_textarea-wrapper',
        disabled && 'dsb_textarea-wrapper--disabled',
        showAbs && 'dsb_textarea-wrapper--relative',
    );

export const getRootClassName = ({
    size,
    error,
    label,
    fullWidth,
    className,
}: {
    size: TextAreaSize;
    error: boolean;
    label?: string;
    fullWidth: boolean;
    className?: string;
}) =>
    classNames(
        'dsb_textarea-root',
        `dsb_textarea-root--${size}`,
        error && 'dsb_textarea-root--error',
        label && 'dsb_textarea-root--labeled',
        fullWidth && 'dsb_textarea-root--fullwidth',
        className,
    );

export const getTextareaClassName = ({
    size,
    error,
    label,
    textareaClassName,
}: {
    size: TextAreaSize;
    error: boolean;
    label?: string;
    textareaClassName?: string;
}) =>
    classNames(
        'dsb_textarea',
        `dsb_textarea--${size}`,
        error && 'dsb_textarea--error',
        label && 'dsb_textarea--labeled',
        textareaClassName,
    );

export const getHelperTextClassName = ({ error, showAbs }: { error: boolean; showAbs: boolean }) =>
    classNames(
        'dsb_textarea-helper-text',
        error && 'dsb_textarea-helper-text--error',
        showAbs && 'dsb_textarea-helper-text--absolute',
    );

export const getMaxHeightStyle = ({
    maxHeight,
    size,
    label,
}: {
    maxHeight?: number;
    size: TextAreaSize;
    label?: string;
}): string => {
    if (!maxHeight) {
        return 'none';
    }

    const standardHeight = TEXTAREA_STANDARD_HEIGHT[size];
    const resolvedMaxHeight = Math.max(maxHeight, standardHeight);
    const marginKey = `${size}${label ? 'Label' : ''}` as keyof typeof TEXTAREA_MARGIN;

    return `${resolvedMaxHeight - TEXTAREA_MARGIN[marginKey]}px`;
};
