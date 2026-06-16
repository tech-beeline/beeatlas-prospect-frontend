import { DATE_LENGTH, EMPTY_DATE, ISO_FORMAT_PATTERN, RANGE_DELIMETER } from './const';
import { formatDateOnly, formatWithTimeZone } from './convertor';

type ClassValue = string | false | null | undefined | 0;

export const classNames = (...values: ClassValue[]) => values.filter(Boolean).join(' ');

export const RU_FORMAT_PATTERN_F = (enableTimePicker?: boolean) =>
    new RegExp(
        '^' +
            '(?<day>\\d{2})\\.' +
            '(?<month>\\d{2})\\.' +
            '(?<year>\\d{4})' +
            (enableTimePicker ? '\\s+(?<hours>\\d{2}):(?<minutes>\\d{2})' : '') +
            '$',
    );

export const isRangeMode = (value: unknown): value is string[] => Array.isArray(value);

export const getInputValue = (
    value: string | string[] | undefined,
    enableTimePicker = false,
    timeZone?: string,
): string | string[] => {
    const formatDate = (dateStr: string) => {
        if (!dateStr || dateStr === EMPTY_DATE) {
            return '';
        }

        if (enableTimePicker && dateStr.includes('T') && dateStr.length > 10) {
            return formatWithTimeZone(dateStr, timeZone);
        }

        return formatDateOnly(dateStr);
    };

    if (isRangeMode(value)) {
        const delimiter = value.every((item) => item === '') ? EMPTY_DATE : RANGE_DELIMETER;

        return value
            .map((rangeVal) => (rangeVal !== EMPTY_DATE ? formatDate(rangeVal) : EMPTY_DATE))
            .join(delimiter);
    }

    if (value && value !== EMPTY_DATE) {
        return formatDate(value);
    }

    return EMPTY_DATE;
};

export const formatValue = (
    value: string | string[] | undefined,
    enableTimePicker?: boolean,
    timeZone?: string,
): string | string[] => getInputValue(value, enableTimePicker, timeZone);

export const maskDateTime = (value: string, enableTime = true) => {
    const dateTime = value.replace(/\D/g, '').slice(0, 12);
    const day = dateTime.slice(0, 2);
    const month = dateTime.slice(2, 4);
    const year = dateTime.slice(4, 8);
    const hour = dateTime.slice(8, 10);
    const minute = dateTime.slice(10, 12);

    let result = '';

    if (day) {
        result += day;
    }

    if (month) {
        result += `.${month}`;
    }

    if (year) {
        result += `.${year}`;
    }

    if (hour && enableTime) {
        result += ` ${hour}`;
    }

    if (minute && enableTime) {
        result += `:${minute}`;
    }

    return result.trim();
};

export const isFilledDate = (
    value: string | string[],
    options: { pattern?: RegExp; isPartial?: boolean } = {},
) => {
    const { pattern = ISO_FORMAT_PATTERN, isPartial = false } = options;

    if (isRangeMode(value)) {
        return isPartial
            ? value.some((date) => date && pattern.test(date))
            : value.every((date) => date && pattern.test(date));
    }

    return pattern.test(value);
};

export type DropdownPlacement = 'top' | 'bottom';

export interface DropdownPosition {
    top: number;
    left: number;
    width: number;
    maxHeight: number;
    placement: DropdownPlacement;
}

export const calculateDropdownPosition = ({
    parentRect,
    dropdownHeight,
    dropdownWidth,
    verticalOffset,
    viewportPadding,
    maxHeightLimit,
}: {
    parentRect: DOMRect;
    dropdownHeight: number;
    dropdownWidth: number;
    verticalOffset: number;
    viewportPadding: number;
    maxHeightLimit: number;
}): DropdownPosition => {
    const spaceBelow = window.innerHeight - parentRect.bottom - viewportPadding;
    const spaceAbove = parentRect.top - viewportPadding;

    const overflowsBottom =
        dropdownHeight > 0 &&
        parentRect.bottom + dropdownHeight + verticalOffset > window.innerHeight - viewportPadding;

    const openUpward = overflowsBottom && spaceAbove > spaceBelow;
    const availableSpace = openUpward ? spaceAbove : spaceBelow;
    const maxHeight = Math.max(0, Math.min(maxHeightLimit, availableSpace));
    const resolvedHeight = dropdownHeight > 0 ? Math.min(dropdownHeight, maxHeight) : maxHeight;

    const top = openUpward
        ? parentRect.top + window.scrollY - resolvedHeight - verticalOffset
        : parentRect.bottom + window.scrollY + verticalOffset;

    return {
        top,
        left: parentRect.left + window.scrollX,
        width: dropdownWidth,
        maxHeight,
        placement: openUpward ? 'top' : 'bottom',
    };
};

export const getDatePickerClassName = ({
    fullWidth,
    className,
}: {
    fullWidth?: boolean;
    className?: string;
}) => classNames('dsb_datepicker', fullWidth && 'dsb_datepicker__full-width', className);

export { DATE_LENGTH, EMPTY_DATE, ISO_FORMAT_PATTERN };
