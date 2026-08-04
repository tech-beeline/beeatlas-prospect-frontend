export const splitSearch = (search: string): { path: string; type: string | null } => {
    const i = search.indexOf(' ');
    if (i !== -1) {
        return { path: search.substring(i + 1), type: search.substring(0, i) };
    }

    return { path: search, type: null };
};
