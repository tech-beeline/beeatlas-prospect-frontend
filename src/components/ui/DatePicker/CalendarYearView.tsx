import React from 'react';

import { getYearsRange } from './calendarUtils';
import { classNames } from './utils';

type CalendarYearViewProps = {
    minYear?: number;
    maxYear?: number;
    viewDate: Date;
    onSelectYear: (year: number) => void;
    showStartPanel?: () => void;
};

export const CalendarYearView = ({
    minYear = 1930,
    maxYear = new Date().getFullYear() + 10,
    viewDate,
    onSelectYear,
    showStartPanel,
}: CalendarYearViewProps) => {
    const currentYear = viewDate.getUTCFullYear();
    const years = getYearsRange(minYear, maxYear);

    const onClick = (year: number) => {
        onSelectYear(year);
        showStartPanel?.();
    };

    return (
        <div className="dsb_calendar-years">
            {years.map((year) => {
                const selected = year === currentYear;

                return (
                    <span
                        key={`year-${year}`}
                        data-testid={`year-${year}`}
                        className={classNames('year', selected && 'selected')}
                        onClick={() => onClick(year)}
                    >
                        {year}
                    </span>
                );
            })}
        </div>
    );
};
