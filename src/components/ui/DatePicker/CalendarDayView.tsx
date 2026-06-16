import React from 'react';

import { convertUtcToTz, getWeeksOfMonth, hasDateLimit, isSameDates } from './calendarUtils';
import { WEEKDAYS } from './const';
import type { CalendarDayInfo } from './types';
import { classNames } from './utils';

type SelectedDateValue = Date | (Date | null)[] | null;

const isSelectedDateRange = (value: SelectedDateValue): value is (Date | null)[] =>
    Array.isArray(value);
type CalendarDayViewProps = {
    minDate?: Date | null;
    maxDate?: Date | null;
    disabledStartDate?: boolean;
    disabledEndDate?: boolean;
    viewDate: Date;
    selectedDate: SelectedDateValue;
    onSelectDay: (day: number, month?: number, year?: number) => void;
    multiselect?: boolean;
    excludeDate?: (date: Date) => boolean;
    holidaysDate?: (date: Date) => boolean;
    readonly?: boolean;
    timeZone?: string;
    showAdjacentMonthDays?: {
        showPrevious?: boolean;
        showNext?: boolean;
    };
    allowAdjacentMonthSelection?: boolean;
    customizeDay?: (date: Date) => {
        className?: string;
        content?: React.ReactNode;
    };
};

const toLocalMidnight = (date: Date, timeZone?: string) => {
    const isUtcMidnight =
        date.getUTCHours() === 0 &&
        date.getUTCMinutes() === 0 &&
        date.getUTCSeconds() === 0 &&
        date.getUTCMilliseconds() === 0;

    if (isUtcMidnight) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }

    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timeZone || 'UTC',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        const parts = formatter.formatToParts(date);
        const getPart = (type: string) => {
            const part = parts.find((item) => item.type === type);

            return part ? parseInt(part.value, 10) : 0;
        };

        return new Date(Date.UTC(getPart('year'), getPart('month') - 1, getPart('day')));
    } catch {
        const local = convertUtcToTz(date, timeZone);

        return new Date(Date.UTC(local.getFullYear(), local.getMonth(), local.getDate()));
    }
};

export const CalendarDayView = ({
    minDate,
    maxDate,
    disabledStartDate,
    disabledEndDate,
    viewDate,
    selectedDate,
    onSelectDay,
    multiselect,
    excludeDate,
    holidaysDate,
    readonly,
    timeZone,
    showAdjacentMonthDays,
    allowAdjacentMonthSelection,
    customizeDay,
}: CalendarDayViewProps) => {
    const localYear = viewDate.getUTCFullYear();
    const localMonth = viewDate.getUTCMonth();

    const now = new Date();
    const todayLocalYear = now.getFullYear();
    const todayLocalMonth = now.getMonth();
    const todayDay = now.getDate();

    const monthWeeks = getWeeksOfMonth(localYear, localMonth, showAdjacentMonthDays);

    const handleSelectDay = (dayInfo: CalendarDayInfo) => {
        if (!dayInfo || !dayInfo.day || readonly) {
            return;
        }

        const isAdjacentMonth = dayInfo.month !== localMonth || dayInfo.year !== localYear;

        if (isAdjacentMonth && !allowAdjacentMonthSelection) {
            return;
        }

        onSelectDay(dayInfo.day, dayInfo.month, dayInfo.year);
    };

    const isCurrentDay = (dayInfo: CalendarDayInfo) => {
        if (!dayInfo || !dayInfo.day) {
            return false;
        }

        return (
            dayInfo.year === todayLocalYear &&
            dayInfo.month === todayLocalMonth &&
            dayInfo.day === todayDay
        );
    };

    const isSelectedDay = (dayInfo: CalendarDayInfo) => {
        if (!dayInfo || !dayInfo.day) {
            return false;
        }

        const checkedDate = new Date(Date.UTC(dayInfo.year, dayInfo.month, dayInfo.day));

        if (!isSelectedDateRange(selectedDate)) {
            if (!selectedDate) {
                return false;
            }

            const selected = toLocalMidnight(selectedDate, timeZone);

            return selected ? isSameDates(checkedDate, selected) : false;
        }

        if (disabledStartDate && disabledEndDate) {
            return false;
        }

        if (disabledStartDate) {
            const end = selectedDate[1];
            const localEnd = end ? toLocalMidnight(end, timeZone) : null;

            return localEnd ? isSameDates(localEnd, checkedDate) : false;
        }

        if (disabledEndDate) {
            const start = selectedDate[0];
            const localStart = start ? toLocalMidnight(start, timeZone) : null;

            return localStart ? isSameDates(localStart, checkedDate) : false;
        }

        return selectedDate.some((date) => {
            if (!date) {
                return false;
            }

            const localDate = toLocalMidnight(date, timeZone);

            return localDate && isSameDates(localDate, checkedDate);
        });
    };

    const isDisabledDay = (dayInfo: CalendarDayInfo) => {
        if (!dayInfo || !dayInfo.day) {
            return false;
        }

        const localCheckedDate = new Date(dayInfo.year, dayInfo.month, dayInfo.day, 0, 0, 0);
        const checkedUTC = new Date(Date.UTC(dayInfo.year, dayInfo.month, dayInfo.day));

        if (excludeDate?.(localCheckedDate)) {
            return true;
        }

        return hasDateLimit(checkedUTC, minDate, maxDate);
    };

    const isHolidayDay = (dayInfo: CalendarDayInfo) => {
        if (dayInfo?.day && holidaysDate) {
            const checkedDate = new Date(dayInfo.year, dayInfo.month, dayInfo.day);

            return holidaysDate(checkedDate);
        }

        return false;
    };

    const getRangeStatusOfDay = (dayInfo: CalendarDayInfo) => {
        if (multiselect || !dayInfo || !dayInfo.day || !isSelectedDateRange(selectedDate)) {
            return {};
        }

        const [startDay, endDay] = selectedDate;
        const isFilledRange = startDay && endDay;
        const checkedDate = new Date(Date.UTC(dayInfo.year, dayInfo.month, dayInfo.day));
        const startDayMidnight = startDay ? toLocalMidnight(startDay, timeZone) : null;
        const endDayMidnight = endDay ? toLocalMidnight(endDay, timeZone) : null;

        const getStarting = () => {
            if (disabledStartDate) {
                return false;
            }

            return Boolean(
                isFilledRange && startDayMidnight && isSameDates(startDayMidnight, checkedDate),
            );
        };

        const getEnding = () => {
            if (disabledEndDate) {
                return false;
            }

            return Boolean(
                isFilledRange && endDayMidnight && isSameDates(endDayMidnight, checkedDate),
            );
        };

        return {
            starting: getStarting(),
            ranging:
                Boolean(startDayMidnight) &&
                startDayMidnight! <= checkedDate &&
                Boolean(endDayMidnight) &&
                endDayMidnight! >= checkedDate,
            ending: getEnding(),
        };
    };

    const getCustomization = (dayInfo: CalendarDayInfo) => {
        if (!dayInfo || !dayInfo.day || !customizeDay) {
            return null;
        }

        const dateToCustomize = new Date(dayInfo.year, dayInfo.month, dayInfo.day);

        return customizeDay(dateToCustomize);
    };

    return (
        <table className="dsb_calendar-dates">
            <thead className="dsb_calendar-weekdays">
                <tr>
                    {WEEKDAYS.map((weekday) => (
                        <th key={weekday} className="dsb_calendar-weekday">
                            {weekday}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="dsb_calendar-weeks">
                {monthWeeks.map((week, weekIndex) => (
                    <tr key={`week-${weekIndex}`}>
                        {week.map((dayInfo, dayIndex) => {
                            const disabled = isDisabledDay(dayInfo);
                            const holiday = isHolidayDay(dayInfo);
                            const selected = isSelectedDay(dayInfo);
                            const today = isCurrentDay(dayInfo);
                            const rangeStatus = getRangeStatusOfDay(dayInfo);
                            const customization = getCustomization(dayInfo);
                            const isAdjacentMonth =
                                dayInfo &&
                                (dayInfo.month !== localMonth || dayInfo.year !== localYear);

                            return (
                                <td
                                    key={`day-${dayIndex}`}
                                    className={classNames(
                                        'dsb_calendar-day-cell',
                                        rangeStatus.starting && 'starting',
                                        rangeStatus.ranging && 'ranging',
                                        rangeStatus.ending && 'ending',
                                    )}
                                >
                                    <span
                                        data-testid={
                                            dayInfo
                                                ? `day-${dayInfo.year}-${dayInfo.month + 1}-${
                                                      dayInfo.day
                                                  }`
                                                : undefined
                                        }
                                        className={classNames(
                                            'dsb_calendar-day',
                                            today && 'today',
                                            disabled && 'disabled',
                                            holiday && 'holiday',
                                            selected && 'selected',
                                            (!dayInfo || dayInfo.day === null) &&
                                                'dsb_calendar-day__empty',
                                            readonly && 'readonly',
                                            isAdjacentMonth && 'adjacent-month',
                                            rangeStatus.starting && 'starting',
                                            rangeStatus.ranging && 'ranging',
                                            rangeStatus.ending && 'ending',
                                            customization?.className,
                                        )}
                                        onClick={() => handleSelectDay(dayInfo)}
                                    >
                                        {customization?.content || (dayInfo && dayInfo.day)}
                                    </span>
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
