import { useCallback, useEffect, useRef, useState } from 'react';

import type { Option } from '../Select/types';

import type { AutocompleteProps } from './types';
import { buildAutocompleteClassName } from './utils';

type UseAutocompleteParams<T> = Pick<
    AutocompleteProps<T>,
    | 'type'
    | 'value'
    | 'open'
    | 'renderValue'
    | 'enableKeyboardNavigation'
    | 'onOpen'
    | 'onClose'
    | 'onChange'
    | 'onFocus'
    | 'onBlur'
    | 'onInputChange'
    | 'onInputClear'
    | 'hideDropDown'
    | 'options'
    | 'className'
>;

export const useAutocomplete = <T>({
    type,
    value,
    open,
    renderValue,
    enableKeyboardNavigation,
    onOpen,
    onClose,
    onChange,
    onFocus,
    onBlur,
    onInputChange,
    onInputClear,
    hideDropDown,
    options,
    className,
}: UseAutocompleteParams<T>) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const isSearch = type === 'search';
    const [isOpen, setOpen] = useState(hideDropDown ? false : Boolean(open));
    const [inputValue, setInputValue] = useState(value ? renderValue(value) : '');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const prevOpenRef = useRef(isOpen);

    useEffect(() => {
        setOpen(hideDropDown ? false : Boolean(open));
    }, [open, hideDropDown]);

    useEffect(() => {
        if (value) {
            setInputValue(renderValue(value));
        }
    }, [value, renderValue]);

    useEffect(() => {
        if (focusedIndex === -1 || !enableKeyboardNavigation) {
            return;
        }

        const focusedElement = optionsRef.current?.children[focusedIndex] as
            | HTMLElement
            | undefined;
        focusedElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [enableKeyboardNavigation, focusedIndex]);

    useEffect(() => {
        if (isOpen && !hideDropDown) {
            onOpen?.();
        }

        if (prevOpenRef.current && (!isOpen || hideDropDown)) {
            onClose?.();
        }

        prevOpenRef.current = isOpen;
    }, [hideDropDown, isOpen, onClose, onOpen]);

    const handleOpen = useCallback(() => {
        if (hideDropDown) {
            return;
        }

        setOpen(true);
        setTimeout(() => innerRef.current?.focus(), 0);
    }, [hideDropDown]);

    const handleClose = useCallback(() => {
        setOpen(false);
        setFocusedIndex(-1);
    }, []);

    const onSelectItem = useCallback(
        (item: Option<T>) => () => {
            onChange(item);
            innerRef.current?.focus();
            setOpen(false);
            setFocusedIndex(-1);

            if (item.id === value?.id) {
                setInputValue(renderValue(item));
            }
        },
        [onChange, renderValue, value?.id],
    );

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!isOpen) {
            handleOpen();
        }

        onFocus?.(event);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!isOpen || hideDropDown) {
            onBlur?.(event);
        }
    };

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        onInputChange(event.target.value);
        handleOpen();
        setFocusedIndex(-1);
    };

    const handleInputClick = () => {
        handleOpen();
    };

    const handleInputOnClear = () => {
        setInputValue('');
        onInputClear();
        onInputChange('');
        setFocusedIndex(-1);
    };

    const maxIndex = Math.max(0, options.length - 1);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!enableKeyboardNavigation) {
            return;
        }

        switch (event.key) {
            case 'ArrowUp': {
                if (!isOpen) {
                    handleOpen();
                }

                setFocusedIndex((prev) => Math.max(0, prev === -1 ? 0 : prev - 1));
                break;
            }
            case 'ArrowDown': {
                if (!isOpen) {
                    handleOpen();
                }

                setFocusedIndex((prev) => Math.min(maxIndex, prev + 1));
                break;
            }
            case 'Enter': {
                const selectedIndex = optionsRef.current
                    ?.querySelector('.focused')
                    ?.getAttribute('data-index');
                const selectedItem = options.find(
                    (option) => option.id.toString() === selectedIndex,
                );

                if (selectedItem) {
                    event.preventDefault();
                    onSelectItem(selectedItem)();
                }

                event.stopPropagation();
                break;
            }
            case 'Escape':
            case 'Tab': {
                handleClose();
                break;
            }
            default: {
                setFocusedIndex(-1);
            }
        }
    };

    const rootClassName = buildAutocompleteClassName(className);

    return {
        isOpen,
        innerRef,
        setOpen,
        handleClose,
        handleInputBlur,
        handleInputFocus,
        inputValue,
        handleInputOnChange,
        handleInputOnClear,
        handleInputClick,
        rootClassName,
        handleKeyDown,
        isSearch,
        optionsRef,
        onSelectItem,
        focusedIndex,
    };
};
