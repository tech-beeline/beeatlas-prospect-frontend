export const isNumber = (value: unknown): value is number => typeof value === 'number';

const calcFormatted = (intValue: number, multiplier: number): string => {
    const abs = Math.abs(intValue) || 0;
    const formattedValue = `${
        Math.sign(intValue) * Number.parseFloat((abs / multiplier).toFixed(1))
    }`;

    return formattedValue.replace('.', ',');
};

export const formatNumber = (value: number | null | undefined): string | undefined => {
    if (!isNumber(value)) {
        return undefined;
    }

    const stringValue = String(value);
    const intValue = Number.parseInt(stringValue, 10);

    if (stringValue.length > 6) {
        return `${calcFormatted(intValue, 1_000_000)}M`;
    }

    if (stringValue.length > 3) {
        return `${calcFormatted(intValue, 1000)}K`;
    }

    return intValue.toString();
};
