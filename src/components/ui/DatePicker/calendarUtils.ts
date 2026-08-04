import dayjs from 'dayjs';

import type { CalendarDayInfo } from './types';

export const getDateFromIsoString = (date?: string): Date | null => {
    if (!date) {
        return null;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        const [year, month, day] = date.split('-').map(Number);

        return new Date(Date.UTC(year, month - 1, day));
    }

    const parsed = dayjs(date);

    if (!parsed.isValid()) {
        return null;
    }

    return parsed.toDate();
};

export const getViewDate = (value?: string | string[]): Date => {
    if (Array.isArray(value)) {
        const first = value[0];
        const parsed = getDateFromIsoString(first);

        return parsed || new Date();
    }

    const parsed = getDateFromIsoString(value);

    return parsed || new Date();
};

export const validateCustomViewDate = (date?: string): Date | null => {
    if (!date) {
        return null;
    }

    const parsed = dayjs(date);

    return parsed.isValid() ? parsed.toDate() : null;
};

const normalizeToUtcMidnight = (date: Date | null) => {
    if (!date || Number.isNaN(date.getTime())) {
        return null;
    }

    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

export const hasDateLimit = (checkedDate: Date, minDate?: Date | null, maxDate?: Date | null) => {
    const checked = normalizeToUtcMidnight(checkedDate);
    const min = normalizeToUtcMidnight(minDate ?? null);
    const max = normalizeToUtcMidnight(maxDate ?? null);

    if (!checked) {
        return false;
    }

    if (min && checked < min) {
        return true;
    }

    if (max && checked > max) {
        return true;
    }

    return false;
};

export const isSameDates = (first: Date, second: Date) =>
    first.getUTCFullYear() === second.getUTCFullYear() &&
    first.getUTCMonth() === second.getUTCMonth() &&
    first.getUTCDate() === second.getUTCDate();

export const formatToISO = (dateUTC: Date, outputDateFormat = 'yyyy-MM-dd') => {
    if (Number.isNaN(dateUTC.getTime())) {
        return '';
    }

    if (outputDateFormat === 'yyyy-MM-dd') {
        const year = dateUTC.getUTCFullYear();
        const month = String(dateUTC.getUTCMonth() + 1).padStart(2, '0');
        const day = String(dateUTC.getUTCDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return dayjs(dateUTC).format('YYYY-MM-DD');
};

export const convertUtcToTz = (originalUTC: Date, _timeZone?: string) => new Date(originalUTC);

export const shiftMonthUTC = (viewDateUTC: Date, _timeZone?: string, delta = 0) => {
    const year = viewDateUTC.getUTCFullYear();
    const month = viewDateUTC.getUTCMonth();
    const day = viewDateUTC.getUTCDate();

    const targetMonthIndex = month + delta;
    const targetYear = year + Math.floor(targetMonthIndex / 12);
    const normalizedMonth = ((targetMonthIndex % 12) + 12) % 12;
    const lastDay = new Date(targetYear, normalizedMonth + 1, 0).getDate();
    const targetDay = Math.min(day, lastDay);

    return new Date(Date.UTC(targetYear, normalizedMonth, targetDay));
};

export const getWeeksOfMonth = (
    localYear: number,
    localMonth: number,
    showAdjacentMonthDays?: {
        showPrevious?: boolean;
        showNext?: boolean;
    },
): CalendarDayInfo[][] => {
    const firstDate = new Date(localYear, localMonth, 1);
    let startDay = firstDate.getDay();

    if (startDay === 0) {
        startDay = 7;
    }

    const daysInMonth = new Date(localYear, localMonth + 1, 0).getDate();
    const prevMonth = localMonth === 0 ? 11 : localMonth - 1;
    const prevYear = localMonth === 0 ? localYear - 1 : localYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    const nextMonth = localMonth === 11 ? 0 : localMonth + 1;
    const nextYear = localMonth === 11 ? localYear + 1 : localYear;

    const weeks: CalendarDayInfo[][] = [];
    let currentDay = 1;

    for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
        const weekRow: CalendarDayInfo[] = new Array(7).fill(null);

        for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
            if (weekIndex === 0 && dayIndex < startDay - 1) {
                if (showAdjacentMonthDays?.showPrevious) {
                    const prevMonthDay = daysInPrevMonth - (startDay - 2 - dayIndex);

                    weekRow[dayIndex] = { day: prevMonthDay, month: prevMonth, year: prevYear };
                } else {
                    weekRow[dayIndex] = null;
                }
            } else if (currentDay > daysInMonth) {
                if (showAdjacentMonthDays?.showNext) {
                    const nextMonthDay = currentDay - daysInMonth;

                    weekRow[dayIndex] = { day: nextMonthDay, month: nextMonth, year: nextYear };
                    currentDay += 1;
                } else {
                    weekRow[dayIndex] = null;
                }
            } else {
                weekRow[dayIndex] = { day: currentDay, month: localMonth, year: localYear };
                currentDay += 1;
            }
        }

        weeks.push(weekRow);

        if (currentDay > daysInMonth && !showAdjacentMonthDays?.showNext) {
            break;
        }

        if (weekIndex > 0 && currentDay > daysInMonth && weekRow.every((cell) => cell !== null)) {
            break;
        }
    }

    return weeks;
};

export const getYearsRange = (startYear: number, endYear: number) =>
    startYear > endYear
        ? [startYear]
        : Array.from({ length: endYear - startYear + 1 })
              .fill(null)
              .map((_empty, index) => startYear + index)
              .reverse();
