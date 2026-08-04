import React, { useEffect, useMemo, useRef } from 'react';

import { Icon } from 'components/ui';
import { TextField } from 'components/ui/TextField';

import { Icons } from 'styles/design-tokens/js/iconfont';

import {
    DEFAULT_DATA_TEST_ID,
    DEFAULT_FILTER_PLACEHOLDER,
    DEFAULT_NO_OPTIONS_TEXT,
    DEFAULT_SELECT_ALL_TEXT,
} from './const';
import { OverflowCount, useSelectOverflowCounter } from './OverflowCount';
import { SelectDropdown } from './SelectDropdown';
import { SelectDropDownContent } from './SelectDropDownContent';
import type { SelectProps } from './types';
import * as S from './units';
import { useSelect } from './useSelect';
import { buildSelectClassName, getSelectIconSize } from './utils';

export const Select = <T,>({
    label,
    helperText,
    multiple,
    filter,
    filterPlaceholder = DEFAULT_FILTER_PLACEHOLDER,
    filterFunction,
    size,
    error,
    values,
    renderValue,
    onChange,
    onClose,
    onOpen,
    onOutsideClick,
    onManualClickOption,
    open,
    onFocus,
    onBlur,
    options,
    fullWidth,
    className,
    disabled,
    makeOption,
    loading,
    loadingText,
    loadingContent,
    applicationRootElementID,
    dropdownElementID,
    dropdownClassName,
    dataTestId = DEFAULT_DATA_TEST_ID,
    selectAll = false,
    selectAllText = DEFAULT_SELECT_ALL_TEXT,
    showTooltip = false,
    noOptionsText = DEFAULT_NO_OPTIONS_TEXT,
    enableKeyboardNavigation = false,
    isShowCountOfValues = false,
    overlayScroll: _overlayScroll,
    shouldRenderOverlay: _shouldRenderOverlay,
    overlayClassName: _overlayClassName,
    alignDropDown: _alignDropDown,
    makeOptionWrapper,
    compareBy,
    hideDropDown = false,
    disableMobileBottomSheet: _disableMobileBottomSheet,
    groups,
    onClick,
    onKeyDown: externalOnKeyDown,
    ...props
}: SelectProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const filterRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const hiddenRef = useRef<HTMLParagraphElement>(null);
    const countRef = useRef<HTMLParagraphElement>(null);

    const {
        isOpen,
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
        focusedOptionId,
        handleSelectAll,
        getSelectAllStatus,
        changeFilterValue,
    } = useSelect({
        open,
        onOpen,
        onClose,
        onChange,
        options,
        values,
        renderValue,
        filter,
        filterFunction,
        enableKeyboardNavigation,
        multiple,
        selectAll,
        inputRef,
        filterRef,
        dropdownRef: selectRef,
        showTooltip,
        onFocus,
        onBlur,
        selectAllText,
        noOptionsText,
        disabled,
        onManualClickOption,
        makeOption,
        loading,
        loadingText,
        loadingContent,
        optionsRef,
        compareBy,
        groups,
    });

    const { counter } = useSelectOverflowCounter({
        inputRef,
        values,
        isShowCountOfValues,
    });

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!isOpen) {
            onBlur?.(event);
            inputRef.current?.blur();
        }
    };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(event);
        inputRef.current?.focus();
    };

    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        onClick?.(event);

        if (disabled) {
            return;
        }

        if (isOpen) {
            handleClose();
        } else {
            handleOpen();
        }
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        externalOnKeyDown?.(event);

        if (!enableKeyboardNavigation || disabled || isOpen || event.defaultPrevented) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault();
            handleOpen();
        }
    };

    const handleSetOpenWrapper = (nextOpen: boolean) => {
        if (nextOpen) {
            handleOpen();
        } else {
            handleClose();
        }
    };

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOutsideClick?.();
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [handleClose, isOpen, onOutsideClick]);

    const iconSize = getSelectIconSize(size);
    const rightIcon = (
        <Icon size={iconSize} iconName={isOpen ? Icons.NavArrowUp : Icons.NavArrowDown} />
    );

    const rootClassName = buildSelectClassName(className);
    const tooltipTitle = disableTooltip ? undefined : inputLabel;

    const dropDownContentProps = useMemo(
        () => ({
            selectedItems: privateValues,
            optionsData: privateOptions,
            selectAll,
            filter,
            filterValue,
            filterFunction,
            filterPlaceholder,
            filterRef,
            changeFilterValue,
            multiple,
            onMultiselectItem,
            onManualClickOption,
            onSelectItem,
            focusedIndex,
            handleSelectAll,
            makeOption,
            showTooltip,
            selectAllText,
            loading,
            loadingText,
            loadingContent,
            noOptionsText,
            optionsRef,
            selectStatus: getSelectAllStatus(),
            makeOptionWrapper,
            groups,
            dataTestId,
            selectRef,
        }),
        [
            privateValues,
            privateOptions,
            selectAll,
            filter,
            filterValue,
            filterFunction,
            filterPlaceholder,
            multiple,
            onMultiselectItem,
            onManualClickOption,
            onSelectItem,
            focusedIndex,
            handleSelectAll,
            makeOption,
            showTooltip,
            selectAllText,
            loading,
            loadingText,
            loadingContent,
            noOptionsText,
            getSelectAllStatus,
            makeOptionWrapper,
            groups,
            dataTestId,
        ],
    );

    return (
        <S.SelectRoot
            ref={rootRef}
            className={rootClassName}
            data-testid={dataTestId}
            title={showTooltip ? tooltipTitle : undefined}
        >
            {isShowCountOfValues && (
                <OverflowCount
                    inputRef={inputRef}
                    values={values}
                    hiddenRef={hiddenRef}
                    countRef={countRef}
                />
            )}

            <TextField
                ref={inputRef}
                label={label}
                helperText={helperText}
                size={size}
                error={error}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={`${dataTestId}-listbox`}
                aria-activedescendant={
                    focusedOptionId !== undefined
                        ? `${dataTestId}-option-${focusedOptionId}`
                        : undefined
                }
                fullWidth={fullWidth}
                endAdornment={rightIcon}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onClick={handleInputClick}
                onKeyDown={handleInputKeyDown}
                disabled={disabled}
                value={inputLabel}
                isClickableAdornment={false}
                readOnly
                dataTestId={`${dataTestId}-textfield`}
                isShowCountOfValues={isShowCountOfValues}
                counter={counter ?? undefined}
                isFocused={isOpen}
                {...props}
            />

            {isOpen && !hideDropDown && (
                <SelectDropdown
                    isOpen={isOpen}
                    parentRef={rootRef}
                    dropdownRef={selectRef}
                    applicationRootElementID={applicationRootElementID}
                    dropdownElementID={dropdownElementID}
                    dropdownClassName={dropdownClassName}
                    onOutsideClick={() => {
                        onOutsideClick?.();
                        handleClose();
                    }}
                    handleSetOpen={handleSetOpenWrapper}
                    dataTestId={`${dataTestId}-dropdown`}
                >
                    <SelectDropDownContent {...dropDownContentProps} />
                </SelectDropdown>
            )}
        </S.SelectRoot>
    );
};

Select.displayName = 'Select';
