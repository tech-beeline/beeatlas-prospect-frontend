export const getAssessmentErrorMessage = (error: unknown): string => {
    const data = (error as { response?: { data?: unknown } })?.response?.data;
    if (typeof data === 'string') return data;
    if (data && typeof data === 'object') {
        const body = data as { detail?: unknown; message?: unknown; error?: unknown };
        for (const value of [body.detail, body.message, body.error]) {
            if (typeof value === 'string') return value;
            if (Array.isArray(value)) {
                const messages = value
                    .map((item) => (typeof item?.msg === 'string' ? item.msg : ''))
                    .filter(Boolean);
                if (messages.length) return messages.join('; ');
            }
        }
    }
    return error instanceof Error
        ? error.message
        : 'Не удалось выполнить запрос. Попробуйте ещё раз.';
};
