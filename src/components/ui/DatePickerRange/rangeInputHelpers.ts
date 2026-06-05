import { EMPTY_DATE, RANGE_DELIMETER, RANGE_DELIMETER_SYMBOL } from '../DatePicker/const';
import { parseDateOnly, parseWithTimeZone } from '../DatePicker/convertor';
import type { RangeDateValue } from '../DatePicker/types';
import { maskDateTime, RU_FORMAT_PATTERN_F } from '../DatePicker/utils';

const maskDate = (value: string) => maskDateTime(value, false);

export const maskRuDate = (value: string, enableTimePicker?: boolean) =>
    enableTimePicker ? maskDateTime(value) : maskDate(value);

export const isRuFilled = (dateStr: string, enableTimePicker?: boolean) =>
    RU_FORMAT_PATTERN_F(enableTimePicker).test(dateStr);

const formatInputToISO = (value: string, enableTimePicker?: boolean): string => {
    if (!value.trim()) {
        return '';
    }

    if (enableTimePicker) {
        return parseWithTimeZone(value) || '';
    }

    return parseDateOnly(value) || '';
};

export const onRangeInputChange = (
    updatedInputValue: string,
    prevInputValue: string,
    originalValue: RangeDateValue,
    _enableImaskConfig?: boolean,
    enableTimePicker?: boolean,
) => {
    const isDeletion = Boolean(prevInputValue) && updatedInputValue.length < prevInputValue.length;

    if (!enableTimePicker && isDeletion && updatedInputValue.endsWith(RANGE_DELIMETER_SYMBOL)) {
        return { maskedDate: updatedInputValue.slice(0, -2), newDateValue: originalValue };
    }

    const values = updatedInputValue.split(RANGE_DELIMETER);
    const startDateStr = values[0]?.trim() ?? '';
    const endDateStr = values[1]?.trim() ?? EMPTY_DATE;

    const isFilledStartDate = RU_FORMAT_PATTERN_F(Boolean(enableTimePicker)).test(startDateStr);

    if (isFilledStartDate) {
        const maskedEndDate = enableTimePicker ? maskDateTime(endDateStr) : maskDate(endDateStr);
        const maskedDate = `${startDateStr}${RANGE_DELIMETER}${maskedEndDate}`;

        return {
            maskedDate,
            newDateValue: [
                formatInputToISO(startDateStr, enableTimePicker),
                formatInputToISO(maskedEndDate, enableTimePicker),
            ] as RangeDateValue,
        };
    }

    const maskedStartDate = enableTimePicker ? maskDateTime(startDateStr) : maskDate(startDateStr);
    const needDeleteLastSymbol = maskedStartDate.endsWith(RANGE_DELIMETER);
    const maskedDate = needDeleteLastSymbol ? maskedStartDate.slice(0, -1) : maskedStartDate;

    return {
        maskedDate,
        newDateValue: [
            formatInputToISO(maskedStartDate, enableTimePicker),
            EMPTY_DATE,
        ] as RangeDateValue,
    };
};

export const shouldClearOnCloseRangeInput = (
    currentText: string,
    prevInputValue: string,
    originalValue: RangeDateValue,
    enableImaskConfig?: boolean,
    enableTimePicker?: boolean,
    excludeDate?: (date: Date) => boolean,
    clearOnExcludedDateClose?: boolean,
) => {
    const { newDateValue } = onRangeInputChange(
        currentText,
        prevInputValue,
        originalValue,
        enableImaskConfig,
        enableTimePicker,
    );
    const [startStr, endStr] = newDateValue;
    const startDate = startStr ? new Date(startStr) : null;
    const endDate = endStr ? new Date(endStr) : null;

    if (startDate && endDate && enableImaskConfig) {
        if (clearOnExcludedDateClose && (excludeDate?.(startDate) || excludeDate?.(endDate))) {
            return true;
        }
    }

    return false;
};
