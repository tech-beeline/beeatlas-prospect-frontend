export const classNames = (
    ...args: Array<string | Record<string, boolean> | undefined | false>
): string =>
    args
        .flatMap((arg) => {
            if (!arg) {
                return [];
            }

            if (typeof arg === 'string') {
                return [arg];
            }

            return Object.entries(arg)
                .filter(([, value]) => value)
                .map(([key]) => key);
        })
        .join(' ');
