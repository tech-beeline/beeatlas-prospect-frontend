export const getPage = (page: number, count: number): number => {
    if (page < 1) {
        return 1;
    }

    if (page > count) {
        return count;
    }

    return page;
};

export const getStart = (
    newPage: number,
    count: number,
    siblingCount: number,
): number | undefined => {
    if (count === 2) {
        return undefined;
    }

    if (newPage <= siblingCount + 1) {
        return 2;
    }

    if (newPage === count) {
        return count - siblingCount - 1 === 1 ? 2 : count - siblingCount - 1;
    }

    if (newPage + siblingCount > count) {
        return count - siblingCount - 1;
    }

    if (newPage + 1 === count && newPage !== 2) {
        return newPage - 1;
    }

    return newPage - Math.floor(siblingCount / 2);
};

export const getFinish = (
    start: number | undefined,
    newPage: number,
    count: number,
    siblingCount: number,
): number | undefined => {
    if (!start) {
        return undefined;
    }

    if (count - newPage - 1 < siblingCount) {
        return count - 1;
    }

    if (newPage === siblingCount + 1) {
        return siblingCount + 2;
    }

    if (newPage < 1 + siblingCount) {
        return start + siblingCount === count ? count - 1 : start + siblingCount;
    }

    return start + siblingCount - 1;
};

export const calcCount = (count: number): number => {
    if (count <= 0) {
        return 1;
    }

    return count;
};

export const calcSiblingCount = (count: number, siblingCount: number): number => {
    if (siblingCount <= 0) {
        return 0;
    }

    if (siblingCount > count) {
        return count;
    }

    return siblingCount;
};

export const calcPage = (count: number, page: number): number => {
    if (page > count) {
        return count;
    }

    if (page <= 0) {
        return 1;
    }

    return page;
};
