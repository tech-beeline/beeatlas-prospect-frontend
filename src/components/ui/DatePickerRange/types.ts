import type { ReactNode, RefObject } from 'react';

import type { DatePickerProps, RangeDateValue } from '../DatePicker/types';

export type PresetPeriod = {
    label: string;
    range: [string, string];
};

export type DatePickerRangeProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
    value?: RangeDateValue;
    onChange?: (date: RangeDateValue) => void;
    clearInvalidOnBlur?: boolean;
    presetPeriods?: PresetPeriod[];
    onPresetPeriodSelect?: (range: [string, string]) => void;
};

export type CalendarRangeProps = {
    value?: RangeDateValue;
    minValue?: string;
    maxValue?: string;
    disabledStartDate?: boolean;
    disabledEndDate?: boolean;
    className?: string;
    datepickerRef?: RefObject<HTMLDivElement>;
    onSelectDate?: (date: RangeDateValue) => void;
    dataTestId?: string;
    onSaveClick?: (() => void) | null;
    saveButtonTitle?: string;
    readonly?: boolean;
    excludeDate?: (date: Date) => boolean;
    customViewDate?: string;
    initialViewDate?: string;
    holidaysDate?: (date: Date) => boolean;
    enableTimePicker?: boolean;
    outputDateFormat?: string;
    customizeDay?: (date: Date) => {
        className?: string;
        content?: ReactNode;
    };
    presetPeriods?: PresetPeriod[];
    onPresetPeriodSelect?: (range: [string, string]) => void;
    timeZone?: string;
    showAdjacentMonthDays?: {
        showPrevious?: boolean;
        showNext?: boolean;
    };
    allowAdjacentMonthSelection?: boolean;
};

export type UseDatePickerRangeProps = {
    value?: RangeDateValue;
    onChange?: (date: RangeDateValue) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onFocus?: DatePickerProps['onFocus'];
    onSaveClick?: () => void;
    enableTimePicker?: boolean;
    timeZone?: string;
    datepickerRef: RefObject<HTMLDivElement>;
    dropdownClassName?: string;
    onBlur?: DatePickerProps['onBlur'];
};
