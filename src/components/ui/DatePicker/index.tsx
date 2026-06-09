import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { IconButton } from 'components/ui';
import { TextField } from 'components/ui/TextField';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { Calendar } from './Calendar';
import { DEFAULT_DATA_TEST_ID } from './const';
import { formatDateOnly, parseDateOnly, parseWithTimeZone } from './convertor';
import { DatePickerDropdown } from './DatePickerDropdown';
import type { DatePickerProps } from './types';
import * as S from './units';
import { useDatePicker } from './useDatePicker';
import { getDatePickerClassName, maskDateTime, RU_FORMAT_PATTERN_F } from './utils';

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
    (
        {
            className,
            value = '',
            minDate = '',
            maxDate = '',
            disabled = false,
            dataTestId = DEFAULT_DATA_TEST_ID,
            onFocus,
            onChange,
            onBlur,
            onClose,
            onOpen,
            fullWidth,
            mobileView: _mobileView,
            onSaveClick,
            excludeDate,
            customViewDate,
            initialViewDate,
            holidaysDate,
            customizeDay,
            error,
            enableTimePicker = false,
            timeRange: _timeRange,
            outOfRangeErrorText: _outOfRangeErrorText,
            dropdownClassName,
            enableImaskConfig: _enableImaskConfig,
            maskConfig: _maskConfig,
            overlayScroll: _overlayScroll,
            shouldRenderOverlay: _shouldRenderOverlay,
            overlayClassName: _overlayClassName,
            alignDropDown: _alignDropDown,
            timeZone,
            hideDropDown = false,
            showAdjacentMonthDays,
            allowAdjacentMonthSelection,
            clearOnExcludedDateClose = true,
            datepickerRef: externalDatepickerRef,
            ...restProps
        },
        forwardedRef,
    ) => {
        const internalDatepickerRef = useRef<HTMLDivElement>(null);
        const datepickerRef = externalDatepickerRef || internalDatepickerRef;
        const inputRef = useRef<HTMLInputElement>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

        const effectiveTimeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

        const {
            isOpen,
            open,
            close,
            selectDate,
            inputValue,
            setInputValue,
            handleChange,
            handleInputFocus,
            handleInputBlur,
        } = useDatePicker({
            value,
            onChange: onChange
                ? (date) => {
                      if (typeof date === 'string') {
                          onChange(date);
                      }
                  }
                : undefined,
            onOpen,
            onFocus,
            onClose,
            onSaveClick,
            enableTimePicker,
            timeZone,
            datepickerRef,
            mobileView: _mobileView,
            dropdownClassName,
            onBlur,
            overlayScroll: _overlayScroll,
            shouldRenderOverlay: _shouldRenderOverlay,
            overlayClassName: _overlayClassName,
            alignDropDown: _alignDropDown,
        });

        useEffect(() => {
            if (isOpen && disabled) {
                close();
            }
        }, [close, disabled, isOpen]);

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const text = event.target.value;

            if (!text.trim()) {
                setInputValue('');
                handleChange('');
                return;
            }

            const maskedValue = maskDateTime(text, enableTimePicker);

            setInputValue(maskedValue);

            const isValidDate = RU_FORMAT_PATTERN_F(enableTimePicker).test(text);

            if (!isValidDate) {
                return;
            }

            if (enableTimePicker) {
                const isoStr = parseWithTimeZone(text, effectiveTimeZone);

                handleChange(isoStr || '');
                return;
            }

            const parsed = parseDateOnly(text);

            handleChange(parsed || '');
        };

        const handleCalendarIconClick = (event: React.MouseEvent) => {
            event.stopPropagation();

            if (isOpen) {
                close();
            } else {
                open();
            }
        };

        const onSave = () => {
            onSaveClick?.();
            close();
        };

        const handleCloseDropdown = () => {
            close();

            if (!inputValue || typeof inputValue !== 'string') {
                return;
            }

            if (enableTimePicker) {
                const isoStr = parseWithTimeZone(inputValue, effectiveTimeZone);

                if (!isoStr) {
                    return;
                }

                const dateObj = new Date(isoStr);

                if (clearOnExcludedDateClose && excludeDate?.(dateObj)) {
                    setInputValue('');
                    handleChange('');
                }

                return;
            }

            const parsed = parseDateOnly(inputValue);

            if (!parsed) {
                return;
            }

            const [yyyy, mm, dd] = parsed.split('-');
            const dateObj = new Date(+yyyy, +mm - 1, +dd);

            if (clearOnExcludedDateClose && excludeDate?.(dateObj)) {
                setInputValue('');
                handleChange('');
            }
        };

        const rightIcon = (
            <IconButton
                size="medium"
                iconName={Icons.Calendar}
                onClick={disabled ? undefined : handleCalendarIconClick}
                disabled={disabled}
                type="button"
            />
        );

        const displayValue = typeof inputValue === 'string' ? inputValue : formatDateOnly(value);

        return (
            <S.DatePickerRoot
                data-testid={dataTestId}
                ref={datepickerRef}
                className={getDatePickerClassName({ fullWidth, className })}
            >
                <TextField
                    {...restProps}
                    ref={inputRef}
                    value={displayValue}
                    disabled={disabled}
                    endAdornment={rightIcon}
                    className="dsb_datepicker_input-textfield"
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                    fullWidth={fullWidth}
                    error={error}
                />

                {!hideDropDown && (
                    <DatePickerDropdown
                        isOpen={isOpen}
                        parentRef={datepickerRef}
                        dropdownRef={dropdownRef}
                        dropdownClassName={dropdownClassName}
                        onOutsideClick={handleCloseDropdown}
                        dataTestId={`${dataTestId}-dropdown`}
                    >
                        <Calendar
                            value={value}
                            minValue={minDate}
                            maxValue={maxDate}
                            datepickerRef={datepickerRef}
                            onSelectDate={selectDate}
                            onSaveClick={onSaveClick ? onSave : null}
                            dataTestId={`${dataTestId}-calendar`}
                            excludeDate={excludeDate}
                            customViewDate={customViewDate}
                            initialViewDate={initialViewDate}
                            holidaysDate={holidaysDate}
                            enableTimePicker={enableTimePicker}
                            timeZone={effectiveTimeZone}
                            customizeDay={customizeDay}
                            showAdjacentMonthDays={showAdjacentMonthDays}
                            allowAdjacentMonthSelection={allowAdjacentMonthSelection}
                        />
                    </DatePickerDropdown>
                )}
            </S.DatePickerRoot>
        );
    },
);

DatePicker.displayName = 'DatePicker';
