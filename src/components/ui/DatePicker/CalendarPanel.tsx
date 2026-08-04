import React from 'react';

import { CalendarDayView } from './CalendarDayView';
import { CalendarMonthView } from './CalendarMonthView';
import { CalendarYearView } from './CalendarYearView';
import { PANELS } from './const';
import type { CalendarPanelProps } from './types';

export const CalendarPanel = ({
    panel,
    minDate,
    maxDate,
    viewDate,
    disabledStartDate: _disabledStartDate,
    disabledEndDate: _disabledEndDate,
    selectedDate,
    selectDay,
    multiselect: _multiselect,
    readonly,
    excludeDate,
    holidaysDate,
    setDaysPanel,
    setMonthsPanel,
    selectMonth,
    selectYear,
    timeZone,
    customizeDay,
    showAdjacentMonthDays,
    allowAdjacentMonthSelection,
}: CalendarPanelProps) => {
    switch (panel) {
        case PANELS.DAYS:
            return (
                <CalendarDayView
                    minDate={minDate}
                    maxDate={maxDate}
                    viewDate={viewDate}
                    selectedDate={selectedDate}
                    onSelectDay={selectDay}
                    readonly={readonly}
                    excludeDate={excludeDate}
                    holidaysDate={holidaysDate}
                    customizeDay={customizeDay}
                    timeZone={timeZone}
                    showAdjacentMonthDays={showAdjacentMonthDays}
                    allowAdjacentMonthSelection={allowAdjacentMonthSelection}
                />
            );
        case PANELS.MONTHS:
            return (
                <CalendarMonthView
                    minDate={minDate}
                    maxDate={maxDate}
                    viewDate={viewDate}
                    showStartPanel={setDaysPanel}
                    onSelectMonth={selectMonth}
                    timeZone={timeZone}
                />
            );
        case PANELS.YEARS:
            return (
                <CalendarYearView
                    viewDate={viewDate}
                    minYear={minDate?.getFullYear()}
                    maxYear={maxDate?.getFullYear()}
                    onSelectYear={selectYear}
                    showStartPanel={setMonthsPanel}
                />
            );
        default:
            return null;
    }
};
