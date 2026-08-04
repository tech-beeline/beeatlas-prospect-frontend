export enum ErrorType {
    RANGE_ERROR = 'RANGE_ERROR',
    RANGE_OVERLAP_ERROR = 'RANGE_OVERLAP_ERROR',
    ALREADY_EXISTS_ERROR = 'ALREADY_EXISTS_ERROR',
}

export const backendErrorMessageToErrorType: Record<string, ErrorType> = {
    "Bad Request: 'startVersion' должно быть меньше, чем 'endVersion'.": ErrorType.RANGE_ERROR,
    'Bad Request: Пересечение диапозонов версий в теле запроса.': ErrorType.RANGE_OVERLAP_ERROR,
    'Bad Request: Новые версии пересекаются с существующими.': ErrorType.ALREADY_EXISTS_ERROR,
    'Bad Request: Новая версия пересекается с существующими.': ErrorType.ALREADY_EXISTS_ERROR,
};

export const errorTypeToMessageMap: Record<ErrorType, string> = {
    [ErrorType.RANGE_ERROR]: 'Начало диапазона должно быть меньше, чем конец диапазона',
    [ErrorType.RANGE_OVERLAP_ERROR]: 'Диапазон версий пересекается с уже имеющимися версиями',
    [ErrorType.ALREADY_EXISTS_ERROR]: 'Такая версия уже существует',
};
