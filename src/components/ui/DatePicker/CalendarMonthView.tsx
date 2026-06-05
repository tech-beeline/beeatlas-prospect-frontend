import React from 'react';

import { hasDateLimit } from './calendarUtils';
import { MONTHS_ABBRS } from './const';
import { classNames } from './utils';

type CalendarMonthViewProps = {
    minDate?: Date | null;
    maxDate?: Date | null;
    viewDate: Date;
    onSelectMonth: (month: number) => void;
    showStartPanel?: () => void;
    timeZone?: string;
};

export const CalendarMonthView = ({
    minDate,
    maxDate,
    viewDate,
    onSelectMonth,
    showStartPanel,
}: CalendarMonthViewProps) => {
    const currentYear = viewDate.getUTCFullYear();
    const currentMonth = viewDate.getUTCMonth();
    const minMonth = minDate ? new Date(minDate.getFullYear(), minDate.getMonth()) : null;
    const maxMonth = maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth()) : null;

    const isDisabledMonth = (monthIndex: number) => {
        const checkedMonth = new Date(currentYear, monthIndex);

        return hasDateLimit(checkedMonth, minMonth, maxMonth);
    };

    const onClick = (monthIndex: number) => {
        if (!isDisabledMonth(monthIndex)) {
            onSelectMonth(monthIndex);
            showStartPanel?.();
        }
    };

    return (
        <div className="dsb_calendar-months">
            {MONTHS_ABBRS.map((month, monthIndex) => {
                const disabled = isDisabledMonth(monthIndex);
                const selected = monthIndex === currentMonth;

                return (
                    <span
                        key={`month-${monthIndex}`}
                        data-testid={`month-${monthIndex}`}
                        className={classNames(
                            'dsb_calendar-month',
                            disabled && 'disabled',
                            selected && 'selected',
                        )}
                        onClick={() => onClick(monthIndex)}
                    >
                        {month}
                    </span>
                );
            })}
        </div>
    );
};
