import React, { useEffect, useRef, useState } from 'react';

import { Button } from 'components/ui/Button';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { CalendarDayView } from '../DatePicker/CalendarDayView';
import { CalendarNavigationIcon } from '../DatePicker/CalendarNavigationIcon';
import {
    formatToISO,
    getDateFromIsoString,
    getViewDate,
    shiftMonthUTC,
    validateCustomViewDate,
} from '../DatePicker/calendarUtils';
import { MONTHS_NAMES } from '../DatePicker/const';
import { classNames, isRangeMode } from '../DatePicker/utils';

import { buildLocalFromClick, selectionReducer, toUTCFromLocal } from './rangeHelpers';
import type { CalendarRangeProps } from './types';

export const CalendarRange = ({
    value = [],
    minValue = '',
    maxValue = '',
    disabledStartDate = false,
    disabledEndDate = false,
    className,
    onSelectDate,
    dataTestId = 'CalendarRange',
    onSaveClick,
    saveButtonTitle = 'Сохранить',
    readonly,
    excludeDate,
    customViewDate,
    initialViewDate,
    holidaysDate,
    enableTimePicker = false,
    outputDateFormat = enableTimePicker ? "yyyy-MM-dd'T'HH:mm:ss'Z'" : 'yyyy-MM-dd',
    customizeDay,
    showAdjacentMonthDays = {
        showPrevious: false,
        showNext: false,
    },
    allowAdjacentMonthSelection,
}: CalendarRangeProps) => {
    const customViewDateValue = validateCustomViewDate(customViewDate);
    const initialViewDateValue = initialViewDate ? new Date(initialViewDate) : null;
    const hasValidValue = Boolean(value?.some((item) => item && item.trim() !== ''));

    const finalInitialViewDate = hasValidValue
        ? getViewDate(value)
        : initialViewDateValue || customViewDateValue || new Date();

    const [viewDateUTC, setViewDateUTC] = useState(finalInitialViewDate);
    const prevValueRef = useRef(value);
    const internalChangeRef = useRef(false);

    useEffect(() => {
        if (internalChangeRef.current) {
            internalChangeRef.current = false;
            return;
        }

        if (value !== prevValueRef.current) {
            prevValueRef.current = value;

            const hasValidValueInEffect = value.some((item) => item && item.trim() !== '');

            if (hasValidValueInEffect) {
                setViewDateUTC(getViewDate(value));
            }
        }
    }, [value]);

    const minDateUTC = getDateFromIsoString(minValue);
    const maxDateUTC = getDateFromIsoString(maxValue);
    const selectedDate = value.map((element) => getDateFromIsoString(element));

    const localView = new Date(
        Date.UTC(viewDateUTC.getUTCFullYear(), viewDateUTC.getUTCMonth(), viewDateUTC.getUTCDate()),
    );
    const localNextMonth = new Date(localView);
    localNextMonth.setUTCMonth(localView.getUTCMonth() + 1);

    const handleSelectDay = (day: number, month?: number, year?: number) => {
        internalChangeRef.current = true;

        if ((disabledStartDate && disabledEndDate) || readonly) {
            return;
        }

        const targetYear = year ?? localView.getUTCFullYear();
        const targetMonth = month ?? localView.getUTCMonth();
        const newUTC = enableTimePicker
            ? toUTCFromLocal(buildLocalFromClick(day, targetMonth, targetYear), true)
            : new Date(Date.UTC(targetYear, targetMonth, day));
        const newISO = enableTimePicker
            ? newUTC.toISOString()
            : formatToISO(newUTC, outputDateFormat);
        const localDate = enableTimePicker
            ? buildLocalFromClick(day, targetMonth, targetYear)
            : newUTC;

        if (!isRangeMode(selectedDate)) {
            onSelectDate?.([newISO, '']);
            return;
        }

        const [startDate, endDate] = selectedDate;

        const nextRange = selectionReducer(
            { startUTC: startDate, endUTC: endDate },
            {
                type: 'dayClick',
                payload: {
                    localDate,
                    newUTC,
                    enableTimePicker,
                    disabledStartDate,
                    disabledEndDate,
                    outputDateFormat,
                    originalStartStr: value[0],
                },
            },
        );

        onSelectDate?.(nextRange);
    };

    const setPrevMonth = () => {
        setViewDateUTC(shiftMonthUTC(viewDateUTC, undefined, -1));
    };

    const setNextMonth = () => {
        setViewDateUTC(shiftMonthUTC(viewDateUTC, undefined, 1));
    };

    const hasFooter = Boolean(onSaveClick) && !readonly;

    const renderLeftPanel = () => (
        <div className="dsb_calendar-panel">
            <header className="dsb_calendar-header">
                <span className="dsb_calendar-navigation">
                    <CalendarNavigationIcon
                        direction={Icons.NavArrowLeft}
                        onClick={setPrevMonth}
                        dataTestId={`${dataTestId}-prev-month`}
                    />
                </span>
                <p className="dsb_calendar-title">
                    <span
                        className="dsb_calendar-select-month"
                        data-testid={`${dataTestId}-select-month`}
                    >
                        {MONTHS_NAMES[localView.getUTCMonth()]}
                    </span>
                    <span
                        className="dsb_calendar-select-year"
                        data-testid={`${dataTestId}-select-year`}
                    >
                        {localView.getUTCFullYear()}
                    </span>
                </p>
            </header>

            <CalendarDayView
                minDate={minDateUTC}
                maxDate={maxDateUTC}
                disabledStartDate={disabledStartDate}
                disabledEndDate={disabledEndDate}
                viewDate={localView}
                selectedDate={selectedDate}
                onSelectDay={handleSelectDay}
                readonly={readonly}
                excludeDate={excludeDate}
                holidaysDate={holidaysDate}
                customizeDay={customizeDay}
                showAdjacentMonthDays={showAdjacentMonthDays}
                allowAdjacentMonthSelection={allowAdjacentMonthSelection}
            />
        </div>
    );

    const renderRightPanel = () => (
        <div className="dsb_calendar-panel">
            <header className="dsb_calendar-header dsb_calendar-header__right">
                <p className="dsb_calendar-title">
                    <span
                        className="dsb_calendar-select-month"
                        data-testid={`${dataTestId}-select-month-next`}
                    >
                        {MONTHS_NAMES[localNextMonth.getUTCMonth()]}
                    </span>
                    <span
                        className="dsb_calendar-select-year"
                        data-testid={`${dataTestId}-select-year-next`}
                    >
                        {localNextMonth.getUTCFullYear()}
                    </span>
                </p>
                <span className="dsb_calendar-navigation">
                    <CalendarNavigationIcon
                        direction={Icons.NavArrowRight}
                        onClick={setNextMonth}
                        dataTestId={`${dataTestId}-next-month`}
                    />
                </span>
            </header>

            <CalendarDayView
                minDate={minDateUTC}
                maxDate={maxDateUTC}
                disabledStartDate={disabledStartDate}
                disabledEndDate={disabledEndDate}
                viewDate={localNextMonth}
                selectedDate={selectedDate}
                onSelectDay={handleSelectDay}
                readonly={readonly}
                excludeDate={excludeDate}
                holidaysDate={holidaysDate}
                customizeDay={customizeDay}
                showAdjacentMonthDays={showAdjacentMonthDays}
                allowAdjacentMonthSelection={allowAdjacentMonthSelection}
            />
        </div>
    );

    return (
        <div
            className={classNames('dsb_calendar dsb_calendar-range', className)}
            data-testid={dataTestId}
            data-allow-adjacent-selection={allowAdjacentMonthSelection ? 'true' : 'false'}
        >
            <div className="dsb_calendar-panels">
                {renderLeftPanel()}

                <div className="dsb_calendar-divider" />

                {renderRightPanel()}
            </div>

            {hasFooter && (
                <div className="dsb_calendar-footer">
                    <Button variant="contained" size="medium" onClick={onSaveClick ?? undefined}>
                        {saveButtonTitle}
                    </Button>
                </div>
            )}
        </div>
    );
};
