import type { FocusEvent, ReactNode, RefObject } from 'react';
import type { Placement } from '@floating-ui/react';

import type { TextFieldProps } from '../TextField/types';

export type SingleDateValue = string;

export type RangeDateValue = string[];

export type DateValue = SingleDateValue | RangeDateValue;

export type DatePickerProps = Omit<
    TextFieldProps,
    'startAdornment' | 'endAdornment' | 'onChange'
> & {
    value?: SingleDateValue;
    minDate?: SingleDateValue;
    maxDate?: SingleDateValue;
    disabledStartDate?: boolean;
    disabledEndDate?: boolean;
    onChange?: (date: SingleDateValue) => void;
    onClose?: () => void;
    onOpen?: () => void;
    mobileView?: boolean;
    datepickerRef?: RefObject<HTMLDivElement>;
    onSaveClick?: () => void;
    excludeDate?: (date: Date) => boolean;
    /** @deprecated Используйте `initialViewDate` */
    customViewDate?: string;
    initialViewDate?: string;
    holidaysDate?: (date: Date) => boolean;
    enableTimePicker?: boolean;
    timeRange?: [string, string];
    outOfRangeErrorText?: string;
    dropdownClassName?: string;
    enableImaskConfig?: boolean;
    maskConfig?: unknown;
    overlayScroll?: boolean;
    shouldRenderOverlay?: boolean;
    overlayClassName?: string;
    alignDropDown?: Placement;
    timeZone?: string;
    customizeDay?: (date: Date) => {
        className?: string;
        content?: ReactNode;
    };
    hideDropDown?: boolean;
    showAdjacentMonthDays?: {
        showPrevious?: boolean;
        showNext?: boolean;
    };
    allowAdjacentMonthSelection?: boolean;
    clearOnExcludedDateClose?: boolean;
};

export type DatePickerDropdownProps = {
    isOpen: boolean;
    parentRef: RefObject<HTMLDivElement>;
    dropdownRef: RefObject<HTMLDivElement>;
    applicationRootElementID?: string;
    dropdownElementID?: string;
    dropdownClassName?: string;
    dropdownWidth?: number;
    onOutsideClick?: () => void;
    onClose?: () => void;
    dataTestId?: string;
    children: ReactNode;
};

export type CalendarDayInfo = {
    day: number;
    month: number;
    year: number;
} | null;

export type CalendarProps = {
    value?: SingleDateValue;
    minValue?: SingleDateValue;
    maxValue?: SingleDateValue;
    disabledStartDate?: boolean;
    disabledEndDate?: boolean;
    className?: string;
    datepickerRef?: RefObject<HTMLDivElement>;
    onSelectDate?: (date: SingleDateValue) => void;
    onOutsideClick?: () => void;
    dataTestId?: string;
    onSaveClick?: (() => void) | null;
    saveButtonTitle?: string;
    mobileView?: boolean;
    readonly?: boolean;
    excludeDate?: (date: Date) => boolean;
    customViewDate?: string;
    initialViewDate?: string;
    holidaysDate?: (date: Date) => boolean;
    enableTimePicker?: boolean;
    timeRange?: [string, string];
    outOfRangeErrorText?: string;
    timeZone?: string;
    customizeDay?: (date: Date) => {
        className?: string;
        content?: ReactNode;
    };
    showAdjacentMonthDays?: {
        showPrevious?: boolean;
        showNext?: boolean;
    };
    allowAdjacentMonthSelection?: boolean;
};

export type UseDatePickerProps = {
    value?: DateValue;
    onChange?: (date: DateValue) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onSaveClick?: () => void;
    enableTimePicker?: boolean;
    timeZone?: string;
    datepickerRef: RefObject<HTMLDivElement>;
    mobileView?: boolean;
    dropdownClassName?: string;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    overlayScroll?: boolean;
    shouldRenderOverlay?: boolean;
    overlayClassName?: string;
    alignDropDown?: Placement;
};

export type CalendarPanelProps = {
    panel: import('./const').CalendarPanel;
    minDate: Date | null;
    maxDate: Date | null;
    viewDate: Date;
    disabledStartDate?: boolean;
    disabledEndDate?: boolean;
    selectedDate: Date | null;
    selectDay: (day: number, month?: number, year?: number) => void;
    multiselect?: boolean;
    readonly?: boolean;
    excludeDate?: (date: Date) => boolean;
    holidaysDate?: (date: Date) => boolean;
    setDaysPanel: () => void;
    setMonthsPanel: () => void;
    selectMonth: (month: number) => void;
    selectYear: (year: number) => void;
    timeZone?: string;
    customizeDay?: (date: Date) => {
        className?: string;
        content?: ReactNode;
    };
    showAdjacentMonthDays?: {
        showPrevious?: boolean;
        showNext?: boolean;
    };
    allowAdjacentMonthSelection?: boolean;
};
