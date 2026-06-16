const isValidDate = (date: Date | null | undefined) => !!date && !Number.isNaN(date.getTime());

const hasStartedRange = (start: Date | null | undefined) => isValidDate(start);

const hasFilledRange = (end: Date | null | undefined) => isValidDate(end);

export const buildLocalFromClick = (
    day: number,
    month: number,
    year: number,
    hours = 0,
    minutes = 0,
) => new Date(year, month, day, hours, minutes, 0, 0);

export const toUTCFromLocal = (localDate: Date, enableTimePicker?: boolean) => {
    if (!enableTimePicker) {
        return localDate;
    }

    return new Date(
        Date.UTC(
            localDate.getFullYear(),
            localDate.getMonth(),
            localDate.getDate(),
            localDate.getHours(),
            localDate.getMinutes(),
            0,
            0,
        ),
    );
};

export const toOutputString = (dateUTC: Date, outputDateFormat: string) => {
    if (Number.isNaN(dateUTC.getTime())) {
        return '';
    }

    if (outputDateFormat === "yyyy-MM-dd'T'HH:mm:ss'Z'") {
        return dateUTC.toISOString();
    }

    const year = dateUTC.getUTCFullYear();
    const month = String(dateUTC.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateUTC.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

type ComputeNextRangeArgs = {
    startUTC: Date | null;
    endUTC: Date | null;
    localDate: Date;
    newUTC: Date;
    enableTimePicker?: boolean;
    disabledStartDate?: boolean;
    disabledEndDate?: boolean;
    outputDateFormat: string;
    originalStartStr?: string;
};

export const computeNextRangeOnDayClick = ({
    startUTC,
    endUTC,
    localDate,
    newUTC,
    enableTimePicker,
    disabledStartDate,
    disabledEndDate,
    outputDateFormat,
    originalStartStr,
}: ComputeNextRangeArgs): [string, string] => {
    const started = hasStartedRange(startUTC);
    const filled = hasFilledRange(endUTC);
    const startStr = started && startUTC ? toOutputString(startUTC, outputDateFormat) : '';
    const endStr = filled && endUTC ? toOutputString(endUTC, outputDateFormat) : '';
    const newStr = enableTimePicker
        ? newUTC.toISOString()
        : toOutputString(newUTC, outputDateFormat);

    if (disabledStartDate && !disabledEndDate) {
        if (started && startUTC && localDate.getTime() <= startUTC.getTime()) {
            return [startStr, startStr];
        }

        return [startStr, newStr];
    }

    if (!disabledStartDate && disabledEndDate) {
        if (filled && endUTC && localDate.getTime() >= endUTC.getTime()) {
            return [endStr, endStr];
        }

        return [newStr, endStr];
    }

    if (!started) {
        return [newStr, ''];
    }

    if (!filled) {
        if (!enableTimePicker) {
            const startOut = toOutputString(startUTC!, outputDateFormat);
            const newOut = toOutputString(newUTC, outputDateFormat);

            if (startOut === newOut) {
                return [newStr, newStr];
            }

            const startMidnightUTC = new Date(
                Date.UTC(
                    startUTC!.getUTCFullYear(),
                    startUTC!.getUTCMonth(),
                    startUTC!.getUTCDate(),
                ),
            );
            const newMidnightUTC = new Date(
                Date.UTC(newUTC.getUTCFullYear(), newUTC.getUTCMonth(), newUTC.getUTCDate()),
            );

            if (newMidnightUTC.getTime() < startMidnightUTC.getTime()) {
                return [newStr, ''];
            }

            return [startStr, newStr];
        }

        const startMs = startUTC!.getTime();
        const newMs = newUTC.getTime();

        if (newMs === startMs) {
            return [newStr, newStr];
        }

        if (newMs < startMs) {
            return [newStr, ''];
        }

        return [originalStartStr || startStr, newStr];
    }

    return [newStr, ''];
};

export const selectionReducer = (
    state: { startUTC: Date | null; endUTC: Date | null },
    action: {
        type: 'dayClick';
        payload: Omit<ComputeNextRangeArgs, 'startUTC' | 'endUTC'>;
    },
): [string, string] => {
    if (action.type === 'dayClick') {
        return computeNextRangeOnDayClick({
            startUTC: state.startUTC,
            endUTC: state.endUTC,
            ...action.payload,
        });
    }

    return ['', ''];
};
