export const groupDataByColumns = <T>(data: T[], columnsLength: number) => {
    const columns: T[][] = Array.from({ length: columnsLength }).map(() => []);

    for (let i = 0; i < data.length; i++) {
        columns[i % columnsLength].push(data[i]);
    }

    return columns;
};
