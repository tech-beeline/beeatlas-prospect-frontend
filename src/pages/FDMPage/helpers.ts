const authParams = ['auth_code', 'auth_state', 'auth_provider'];

export const validateFDMParams = (params: URLSearchParams): boolean => {
    const paramsObject = Object.fromEntries(params);
    const filteredEntries = Object.entries(paramsObject).filter(
        (entry) => !authParams.includes(entry[0]),
    );
    const paramsLength = filteredEntries.length;
    const filteredParams = Object.fromEntries(filteredEntries);

    if (paramsLength === 0) {
        return true;
    }

    if (
        paramsLength === 2 &&
        ((filteredParams.id && filteredParams.level) ||
            (filteredParams.id && filteredParams.domainId))
    ) {
        return true;
    }

    if (
        paramsLength === 3 &&
        filteredParams.id &&
        filteredParams.level &&
        filteredParams.domainId
    ) {
        return true;
    }

    return false;
};
