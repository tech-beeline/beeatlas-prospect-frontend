import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const parseDateOnly = (userInput: string): string | null => {
    if (!userInput.trim()) {
        return null;
    }

    const parsed = dayjs(userInput, 'DD.MM.YYYY', true);

    if (!parsed.isValid()) {
        return null;
    }

    return parsed.format('YYYY-MM-DD');
};

export const formatDateOnly = (value: string): string => {
    if (!value) {
        return '';
    }

    const datePart = value.includes('T') ? value.split('T')[0] : value;
    const parsed = dayjs(datePart, ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss.SSSZ'], true);

    if (!parsed.isValid()) {
        const fallback = dayjs(value);

        if (!fallback.isValid()) {
            return '';
        }

        return fallback.format('DD.MM.YYYY');
    }

    return parsed.format('DD.MM.YYYY');
};

export const parseWithTimeZone = (userInput: string, _timeZone?: string): string | null => {
    if (!userInput.trim()) {
        return null;
    }

    const parsed = dayjs(userInput, 'DD.MM.YYYY HH:mm', true);

    if (!parsed.isValid()) {
        return null;
    }

    return parsed.toISOString();
};

export const formatWithTimeZone = (dateIsoString: string, _timeZone?: string): string => {
    if (!dateIsoString) {
        return '';
    }

    const parsed = dayjs(dateIsoString);

    if (!parsed.isValid()) {
        return '';
    }

    return parsed.format('DD.MM.YYYY HH:mm');
};
