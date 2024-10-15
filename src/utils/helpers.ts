export const capitalizeFirstLetter = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

// 1 год, 2 года, 5 лет
export const pluralize = (variants: [string, string, string], n: number) => {
    if (n === 11) return variants[2];
    const lastDigit = n % 10;
    if (lastDigit === 1) return variants[0];
    if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) return variants[1];
    return variants[2];
};

export const prettifyJSONString = (json: string) => {
    try {
        return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
        return json;
    }
};
