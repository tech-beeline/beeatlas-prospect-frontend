import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { Search } from 'components/ui/Search';
import { SelectDropdown } from 'components/ui/Select/SelectDropdown';
import { TextField } from 'components/ui/TextField';

import { AutocompleteDropDownContent } from './AutocompleteDropDownContent';
import { DEFAULT_APPLICATION_ROOT_ELEMENT_ID, DEFAULT_DATA_TEST_ID } from './const';
import type { AutocompleteProps } from './types';
import * as S from './units';
import { useAutocomplete } from './useAutocomplete';

export const Autocomplete = forwardRef(
    <T,>(
        {
            size,
            value,
            onChange,
            dropdownClassName,
            dropdownElementID,
            onClose,
            onOpen,
            open,
            onFocus,
            onBlur,
            onClick,
            options,
            fullWidth,
            className,
            disabled,
            renderValue,
            onInputChange,
            onInputClear,
            makeOption,
            label,
            type,
            showTooltip = false,
            noOptionsText,
            noOptionsContents,
            loading,
            loadingText,
            loadingContent,
            hideDropDown = false,
            dataTestId = DEFAULT_DATA_TEST_ID,
            enableKeyboardNavigation = false,
            overlayScroll: _overlayScroll,
            shouldRenderOverlay: _shouldRenderOverlay,
            overlayClassName: _overlayClassName,
            alignDropDown: _alignDropDown,
            enableGrouping: _enableGrouping,
            onFilterChange: _onFilterChange,
            filterItems: _filterItems,
            selectedFilter: _selectedFilter,
            maskConfig: _maskConfig,
            mobileTitle: _mobileTitle,
            mobileCaption: _mobileCaption,
            applicationRootElementID = DEFAULT_APPLICATION_ROOT_ELEMENT_ID,
            classNameMobileModal: _classNameMobileModal,
            disableMaxLength,
            ...props
        }: AutocompleteProps<T>,
        ref: React.ForwardedRef<HTMLInputElement>,
    ) => {
        const rootRef = useRef<HTMLDivElement>(null);

        const {
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
        } = useAutocomplete({
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
        });

        useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

        useEffect(() => {
            if (!isOpen) {
                return undefined;
            }

            const handleEsc = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    handleClose();
                }
            };

            document.addEventListener('keydown', handleEsc);

            return () => {
                document.removeEventListener('keydown', handleEsc);
            };
        }, [handleClose, isOpen]);

        const handleSetOpen = (nextOpen: boolean) => {
            if (nextOpen) {
                setOpen(true);
            } else {
                handleClose();
            }
        };

        const searchSize: 'small' | 'medium' = size === 'large' ? 'medium' : size ?? 'medium';

        return (
            <S.AutocompleteRoot
                ref={rootRef}
                data-testid={dataTestId}
                className={rootClassName}
                onKeyDown={enableKeyboardNavigation ? handleKeyDown : undefined}
            >
                {isSearch ? (
                    <Search
                        {...props}
                        ref={innerRef}
                        size={searchSize}
                        fullWidth={fullWidth}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        onChange={handleInputOnChange}
                        onClear={handleInputOnClear}
                        disabled={disabled}
                        value={inputValue}
                        dataTestId={`${dataTestId}-search`}
                    />
                ) : (
                    <TextField
                        {...props}
                        ref={innerRef}
                        label={label}
                        size={size}
                        fullWidth={fullWidth}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        onChange={handleInputOnChange}
                        onClick={(event) => {
                            onClick?.(event);
                            handleInputClick();
                        }}
                        disabled={disabled}
                        value={inputValue}
                        disableMaxLength={disableMaxLength}
                        dataTestId={`${dataTestId}-textField`}
                    />
                )}

                {isOpen && !hideDropDown && (
                    <SelectDropdown
                        isOpen={isOpen}
                        parentRef={rootRef}
                        dropdownRef={optionsRef}
                        applicationRootElementID={applicationRootElementID}
                        dropdownElementID={dropdownElementID}
                        dropdownClassName={dropdownClassName}
                        onOutsideClick={handleClose}
                        handleSetOpen={handleSetOpen}
                        dataTestId={`${dataTestId}-dropdown`}
                    >
                        <AutocompleteDropDownContent
                            options={options}
                            inputValue={inputValue}
                            value={value}
                            loading={loading}
                            loadingText={loadingText}
                            loadingContent={loadingContent}
                            noOptionsText={noOptionsText}
                            noOptionsContents={noOptionsContents}
                            makeOption={makeOption}
                            showTooltip={showTooltip}
                            focusedIndex={focusedIndex}
                            onSelectItem={onSelectItem}
                            optionsRef={optionsRef}
                            dataTestId={dataTestId}
                        />
                    </SelectDropdown>
                )}
            </S.AutocompleteRoot>
        );
    },
) as <T>(
    props: AutocompleteProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => React.ReactElement | null;

Object.assign(Autocomplete, { displayName: 'Autocomplete' });
