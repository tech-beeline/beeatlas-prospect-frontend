export const stringToBase64 = (str: string): string => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    let binary = '';
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    return btoa(binary);
};

export const parseDslError = (rawError: string): string => {
    if (!rawError || typeof rawError !== 'string') {
        return 'Неизвестная ошибка синтаксиса DSL';
    }

    try {
        if (rawError.trim().startsWith('{')) {
            const parsed = JSON.parse(rawError);
            if (parsed.error && typeof parsed.error === 'string') {
                rawError = parsed.error;
            }
        }
    } catch (e) {}

    let message = rawError;

    const arrowIndex = message.indexOf('->');
    if (arrowIndex !== -1) {
        message = message.substring(0, arrowIndex).trim();
    } else {
        const questionIndex = message.indexOf('?');
        if (questionIndex !== -1) {
            message = message.substring(0, questionIndex + 1).trim();
        }
    }

    return `Ошибка валидации: ${message}`;
};
