import React, { useEffect, useRef, useState } from 'react';

import { Button } from 'components/ui/Button';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { CalendarNavigationIcon } from './CalendarNavigationIcon';
import { CalendarPanel } from './CalendarPanel';
import {
    formatToISO,
    getDateFromIsoString,
    getViewDate,
    shiftMonthUTC,
    validateCustomViewDate,
} from './calendarUtils';
import { type CalendarPanel as CalendarPanelMode, MONTHS_NAMES, PANELS } from './const';
import type { CalendarProps } from './types';
import { classNames } from './utils';

export const Calendar = ({
    value = '',
    minValue = '',
    maxValue = '',
    className,
    datepickerRef: _datepickerRef,
    onSelectDate,
    dataTestId = 'Calendar',
    onSaveClick,
    saveButtonTitle = 'Сохранить',
    readonly,
    excludeDate: _excludeDate,
    customViewDate,
    initialViewDate,
    holidaysDate,
    enableTimePicker = false,
    timeZone,
    customizeDay,
    showAdjacentMonthDays = {
        showPrevious: false,
        showNext: false,
    },
    allowAdjacentMonthSelection,
}: CalendarProps) => {
    const [panel, setPanel] = useState<CalendarPanelMode>(PANELS.DAYS);

    const customViewDateValue = validateCustomViewDate(customViewDate);
    const initialViewDateValue = initialViewDate ? new Date(initialViewDate) : null;
    const hasValidValue = Boolean(value && value !== '');

    const finalInitialViewDate = hasValidValue
        ? getViewDate(value)
        : initialViewDateValue || customViewDateValue || getViewDate(value);

    const [viewDateUTC, setViewDateUTC] = useState(finalInitialViewDate);
    const prevValueRef = useRef(value);

    useEffect(() => {
        if (value !== prevValueRef.current) {
            prevValueRef.current = value;

            const currentHasValidValue = Boolean(value && value !== '');

            if (currentHasValidValue) {
                setViewDateUTC(getViewDate(value));
            } else if (!initialViewDateValue && !customViewDateValue) {
                setViewDateUTC(getViewDate(value));
            }
        }
    }, [customViewDateValue, initialViewDateValue, value]);

    const minDateUTC = getDateFromIsoString(minValue);
    const maxDateUTC = getDateFromIsoString(maxValue);
    const selectedDate = getDateFromIsoString(value);

    const localView = new Date(
        Date.UTC(viewDateUTC.getUTCFullYear(), viewDateUTC.getUTCMonth(), viewDateUTC.getUTCDate()),
    );
    const localYear = localView.getUTCFullYear();
    const localMonth = localView.getUTCMonth();

    const setDaysPanel = () => setPanel(PANELS.DAYS);
    const setMonthsPanel = () => setPanel(PANELS.MONTHS);
    const setYearsPanel = () => setPanel(PANELS.YEARS);

    const showCalendarTypesPanel = () => {
        if (panel === PANELS.YEARS || panel === PANELS.MONTHS) {
            setDaysPanel();
        }

        if (panel === PANELS.DAYS) {
            setYearsPanel();
        }
    };

    const handleSelectDay = (day: number, month?: number, year?: number) => {
        if (readonly) {
            return;
        }

        if (month !== undefined && year !== undefined) {
            setViewDateUTC(new Date(Date.UTC(year, month, 1)));
        }

        const targetYear = year ?? localYear;
        const targetMonth = month ?? localMonth;
        const newUTC = new Date(Date.UTC(targetYear, targetMonth, day));
        const newISO = formatToISO(
            newUTC,
            enableTimePicker ? "yyyy-MM-dd'T'HH:mm:ss'Z'" : 'yyyy-MM-dd',
        );

        onSelectDate?.(newISO);
    };

    const handleSelectMonth = (month: number) => {
        setViewDateUTC(shiftMonthUTC(viewDateUTC, timeZone, month - viewDateUTC.getUTCMonth()));
        setDaysPanel();
    };

    const handleSelectYear = (year: number) => {
        setViewDateUTC(
            new Date(
                Date.UTC(
                    year,
                    viewDateUTC.getUTCMonth(),
                    viewDateUTC.getUTCDate(),
                    viewDateUTC.getUTCHours(),
                    viewDateUTC.getUTCMinutes(),
                ),
            ),
        );
        setDaysPanel();
    };

    const setPrevMonth = () => {
        setViewDateUTC(shiftMonthUTC(viewDateUTC, timeZone, -1));
    };

    const setNextMonth = () => {
        setViewDateUTC(shiftMonthUTC(viewDateUTC, timeZone, 1));
    };

    const navigationDirection = panel === PANELS.DAYS ? Icons.ArrowDropDown : Icons.ArrowDropUp;

    const hasFooter = Boolean(onSaveClick) && !readonly;

    return (
        <div
            className={classNames('dsb_calendar', className)}
            data-testid={dataTestId}
            data-allow-adjacent-selection={allowAdjacentMonthSelection ? 'true' : 'false'}
        >
            <div className={classNames('dsb_calendar-panel', hasFooter && 'multiselect')}>
                <header className="dsb_calendar-header">
                    <p className="dsb_calendar-title">
                        <span
                            className="dsb_calendar-select-month"
                            data-testid={`${dataTestId}-select-month`}
                        >
                            {MONTHS_NAMES[localMonth]}
                        </span>
                        <span
                            className="dsb_calendar-select-year"
                            data-testid={`${dataTestId}-select-year`}
                        >
                            {localYear}
                        </span>
                        <CalendarNavigationIcon
                            direction={navigationDirection}
                            onClick={showCalendarTypesPanel}
                            dataTestId={`${dataTestId}-back`}
                        />
                    </p>
                    <span className="dsb_calendar-navigation">
                        <CalendarNavigationIcon
                            direction={Icons.NavArrowLeft}
                            onClick={setPrevMonth}
                            dataTestId={`${dataTestId}-prev-month`}
                        />
                        <CalendarNavigationIcon
                            direction={Icons.NavArrowRight}
                            onClick={setNextMonth}
                            dataTestId={`${dataTestId}-next-month`}
                        />
                    </span>
                </header>

                <CalendarPanel
                    panel={panel}
                    minDate={minDateUTC}
                    maxDate={maxDateUTC}
                    viewDate={viewDateUTC}
                    selectedDate={selectedDate}
                    selectDay={handleSelectDay}
                    readonly={readonly}
                    excludeDate={undefined}
                    holidaysDate={holidaysDate}
                    setDaysPanel={setDaysPanel}
                    setMonthsPanel={setMonthsPanel}
                    selectMonth={handleSelectMonth}
                    selectYear={handleSelectYear}
                    timeZone={timeZone}
                    customizeDay={customizeDay}
                    showAdjacentMonthDays={showAdjacentMonthDays}
                    allowAdjacentMonthSelection={allowAdjacentMonthSelection}
                />
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
