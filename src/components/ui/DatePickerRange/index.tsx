import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { DEFAULT_DATA_TEST_ID } from '../DatePicker/const';
import { getDatePickerClassName } from '../DatePicker/utils';
import { TextField } from '../TextField';

import { CalendarRange } from './CalendarRange';
import { DatePickerRangeDropdown } from './DatePickerRangeDropdown';
import {
    isRuFilled,
    maskRuDate,
    onRangeInputChange,
    shouldClearOnCloseRangeInput,
} from './rangeInputHelpers';
import type { DatePickerRangeProps } from './types';
import * as S from './units';
import { useDatePickerRange, usePrevious } from './useDatePickerRange';

export const DatePickerRange = forwardRef<HTMLInputElement, DatePickerRangeProps>(
    (
        {
            className,
            value = [],
            minDate = '',
            maxDate = '',
            disabledStartDate = false,
            disabledEndDate = false,
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
            clearInvalidOnBlur = false,
            presetPeriods: _presetPeriods,
            onPresetPeriodSelect,
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
        } = useDatePickerRange({
            value,
            onChange,
            onOpen,
            onFocus,
            onClose,
            onSaveClick,
            enableTimePicker,
            timeZone,
            datepickerRef,
            dropdownClassName,
            onBlur,
        });

        const prevInputValue = usePrevious(inputValue);
        const prevInputValueText = typeof prevInputValue === 'string' ? prevInputValue : '';

        useEffect(() => {
            if (isOpen && disabled) {
                close();
            }
        }, [close, disabled, isOpen]);

        const handleCloseDropdown = () => {
            close();

            const currentText = inputRef.current?.value ?? '';
            const needClear = shouldClearOnCloseRangeInput(
                currentText,
                prevInputValueText,
                value,
                _enableImaskConfig,
                enableTimePicker,
                excludeDate,
                clearOnExcludedDateClose,
            );

            if (needClear) {
                setInputValue('');
                handleChange([]);
            }
        };

        const handleInputBlurWithClearInvalid = (event: React.FocusEvent<HTMLInputElement>) => {
            if (!clearInvalidOnBlur) {
                handleInputBlur(event);
                return;
            }

            const currentText = inputRef.current?.value ?? '';

            if (currentText.trim().length === 0) {
                handleInputBlur(event);
                return;
            }

            const { newDateValue } = onRangeInputChange(
                currentText,
                prevInputValueText,
                value,
                _enableImaskConfig,
                enableTimePicker,
            );
            const [startISO, endISO] = newDateValue;
            const parts = currentText.split(' – ');
            const startText = parts[0]?.trim() ?? '';
            const endText = parts[1]?.trim() ?? '';
            const startMasked = maskRuDate(startText, enableTimePicker);
            const endMasked = maskRuDate(endText, enableTimePicker);
            const startInvalid = isRuFilled(startMasked, enableTimePicker) && startISO === '';
            const endInvalid = isRuFilled(endMasked, enableTimePicker) && endISO === '';

            if (startInvalid) {
                setInputValue('');
                handleChange([]);
                handleInputBlur(event);
                return;
            }

            if (endInvalid) {
                setInputValue(startMasked);
                handleChange([startISO, '']);
                handleInputBlur(event);
                return;
            }

            handleInputBlur(event);
        };

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const updatedInputValue = event.target.value;
            const { maskedDate, newDateValue } = onRangeInputChange(
                updatedInputValue,
                prevInputValueText,
                value,
                _enableImaskConfig,
                enableTimePicker,
            );

            setInputValue(maskedDate);

            if (updatedInputValue.length === 0) {
                handleChange([]);
                return;
            }

            const hasValidDate = newDateValue[0] !== '' || newDateValue[1] !== '';
            const hasDateFormat = updatedInputValue.includes('.');
            const isShortInput = updatedInputValue.length <= 2 && updatedInputValue.length > 0;

            if (hasValidDate || hasDateFormat || isShortInput) {
                handleChange(newDateValue);
            }
        };

        const handleCalendarIconClick = (event: React.MouseEvent) => {
            event.stopPropagation();

            if (isOpen) {
                close();
            } else {
                open();
            }
        };

        const handlePresetSelect = (range: [string, string]) => {
            selectDate(range);
            onPresetPeriodSelect?.(range);
        };

        const onSave = () => {
            onSaveClick?.();
            close();
        };

        const isInputDisabled = disabled || (disabledStartDate && disabledEndDate);

        const rightIcon = (
            <IconButton
                size="medium"
                iconName={Icons.Calendar}
                onClick={isInputDisabled ? undefined : handleCalendarIconClick}
                disabled={isInputDisabled}
                type="button"
            />
        );

        return (
            <S.DatePickerRangeRoot
                data-testid={dataTestId}
                ref={datepickerRef}
                className={getDatePickerClassName({
                    fullWidth,
                    className: `${className || ''} dsb_datepicker-range`.trim(),
                })}
            >
                <TextField
                    {...restProps}
                    ref={inputRef}
                    value={inputValue}
                    disabled={isInputDisabled}
                    endAdornment={rightIcon}
                    className="dsb_datepicker_input-textfield"
                    onBlur={handleInputBlurWithClearInvalid}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                    fullWidth={fullWidth}
                    error={error}
                />

                {!hideDropDown && (
                    <DatePickerRangeDropdown
                        isOpen={isOpen}
                        parentRef={datepickerRef}
                        dropdownRef={dropdownRef}
                        dropdownClassName={dropdownClassName}
                        onOutsideClick={handleCloseDropdown}
                        dataTestId={`${dataTestId}-dropdown`}
                    >
                        <CalendarRange
                            value={value}
                            minValue={minDate}
                            maxValue={maxDate}
                            disabledStartDate={disabledStartDate}
                            disabledEndDate={disabledEndDate}
                            datepickerRef={datepickerRef}
                            onSelectDate={selectDate}
                            onSaveClick={onSaveClick ? onSave : null}
                            dataTestId={`${dataTestId}-calendar`}
                            excludeDate={excludeDate}
                            customViewDate={customViewDate}
                            initialViewDate={initialViewDate}
                            holidaysDate={holidaysDate}
                            enableTimePicker={enableTimePicker}
                            customizeDay={customizeDay}
                            onPresetPeriodSelect={handlePresetSelect}
                            timeZone={effectiveTimeZone}
                            showAdjacentMonthDays={showAdjacentMonthDays}
                            allowAdjacentMonthSelection={allowAdjacentMonthSelection}
                        />
                    </DatePickerRangeDropdown>
                )}
            </S.DatePickerRangeRoot>
        );
    },
);

DatePickerRange.displayName = 'DatePickerRange';
