import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { type PrivateOption, type SelectProps, CheckboxType } from './types';
import {
    addArrayIndex,
    compareValues,
    defaultRenderValue,
    getCheckboxStatus,
    getOptionsInDisplayOrder,
    getPreparedOptions,
} from './utils';

type UseSelectParams<T> = Pick<
    SelectProps<T>,
    | 'open'
    | 'onOpen'
    | 'onClose'
    | 'onChange'
    | 'options'
    | 'values'
    | 'renderValue'
    | 'filter'
    | 'filterFunction'
    | 'enableKeyboardNavigation'
    | 'multiple'
    | 'selectAll'
    | 'showTooltip'
    | 'onFocus'
    | 'onBlur'
    | 'selectAllText'
    | 'noOptionsText'
    | 'disabled'
    | 'onManualClickOption'
    | 'makeOption'
    | 'loading'
    | 'loadingText'
    | 'loadingContent'
    | 'compareBy'
    | 'groups'
> & {
    inputRef: React.RefObject<HTMLInputElement | null>;
    filterRef: React.RefObject<HTMLInputElement | null>;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    optionsRef: React.RefObject<HTMLDivElement | null>;
};

export const useSelect = <T>({
    open,
    onOpen,
    onClose,
    onChange,
    options,
    values,
    renderValue,
    filter,
    filterFunction,
    multiple,
    selectAll,
    inputRef,
    filterRef,
    showTooltip,
    onFocus,
    onBlur,
    compareBy,
    groups,
}: UseSelectParams<T>) => {
    const [isOpen, setOpen] = useState(open);
    const [filterValue, setFilterValue] = useState('');
    const [disableTooltip, setDisableTooltip] = useState(true);
    const lastFocusedRef = useRef<HTMLElement | null>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const { privateOptions, privateValues } = useMemo(
        () => addArrayIndex(options, values),
        [options, values],
    );

    useEffect(() => {
        const handleFocusIn = (event: FocusEvent) => {
            if (filterRef.current?.contains(event.target as Node)) {
                lastFocusedRef.current = filterRef.current;
            } else if (inputRef.current?.contains(event.target as Node)) {
                lastFocusedRef.current = inputRef.current;
            }
        };

        document.addEventListener('focusin', handleFocusIn);

        return () => {
            document.removeEventListener('focusin', handleFocusIn);
        };
    }, [filterRef, inputRef]);

    useEffect(() => {
        if (open !== undefined) {
            setOpen(open);
        }
    }, [open]);

    useEffect(() => {
        setDisableTooltip(
            showTooltip
                ? (inputRef.current?.offsetWidth ?? 0) >= (inputRef.current?.scrollWidth ?? 0)
                : true,
        );
    }, [inputRef, renderValue, values, showTooltip]);

    const handleOpen = useCallback(() => {
        setFilterValue('');
        setOpen(true);
        onOpen?.();
        inputRef.current?.focus();
        setTimeout(() => filter && filterRef.current?.focus(), 100);
    }, [filter, filterRef, inputRef, onOpen]);

    const handleClose = useCallback(() => {
        if (filter && filterRef.current && lastFocusedRef.current === filterRef.current) {
            const event = {
                target: inputRef.current,
                currentTarget: inputRef.current,
                bubbles: true,
                cancelable: false,
                type: 'blur',
            } as React.FocusEvent<HTMLInputElement>;

            onBlur?.(event);
        }

        setFilterValue('');
        setOpen(false);
        setFocusedIndex(-1);
        onClose?.();
        inputRef.current?.blur();
    }, [filter, filterRef, inputRef, onBlur, onClose]);

    const inputLabel = renderValue ? renderValue(values) : defaultRenderValue(values);

    const onSelectItem = (item: PrivateOption<T>) => () => {
        onChange([item.value]);
        handleClose();
    };

    const onMultiselectItem = (item: PrivateOption<T>) => () => {
        const itemIndex = privateValues.findIndex((value) =>
            compareValues(item.value, value.value, compareBy),
        );
        const isAddition = itemIndex === -1;
        const updatedItems = isAddition
            ? [...privateValues, item]
            : privateValues.filter((_value, index) => itemIndex !== index);

        onChange(
            updatedItems.map((entry) => entry.value),
            item.value,
        );
    };

    const keyboardOptions = getOptionsInDisplayOrder(
        getPreparedOptions(privateOptions, filter, filterValue, filterFunction),
        groups,
    );
    const focusedOptionId = focusedIndex >= 0 ? keyboardOptions[focusedIndex]?.id : undefined;

    const handleSelectAll = () => {
        const filteredOptions = getPreparedOptions(
            privateOptions,
            filter,
            filterValue,
            filterFunction,
        );
        const enabledFilteredOptions = filteredOptions.filter((option) => !option.disabled);
        const isChecked =
            getCheckboxStatus(
                privateOptions,
                privateValues,
                filterValue,
                filter,
                filterFunction,
                compareBy,
            ) === CheckboxType.CHECKED;

        const checkedFilterFunction = (value: PrivateOption<T>) =>
            !enabledFilteredOptions.some((option) =>
                compareValues(option.value, value.value, compareBy),
            );

        const updatedValues = isChecked
            ? privateValues.filter((element) => checkedFilterFunction(element))
            : [
                  ...privateValues,
                  ...enabledFilteredOptions.filter(
                      (option) =>
                          !privateValues.some((value) =>
                              compareValues(option.value, value.value, compareBy),
                          ),
                  ),
              ];

        onChange(updatedValues.map((item) => item.value));
    };

    const getSelectAllStatus = () =>
        getCheckboxStatus(
            privateOptions,
            privateValues,
            filterValue,
            filter,
            filterFunction,
            compareBy,
        );

    const changeFilterValue = (value: string) => {
        setFilterValue(value);
    };

    return {
        isOpen,
        setOpen,
        filterValue,
        disableTooltip,
        privateOptions,
        privateValues,
        inputLabel,
        handleOpen,
        handleClose,
        onSelectItem,
        onMultiselectItem,
        focusedIndex,
        setFocusedIndex,
        focusedOptionId,
        handleSelectAll,
        getSelectAllStatus,
        changeFilterValue,
    };
};
