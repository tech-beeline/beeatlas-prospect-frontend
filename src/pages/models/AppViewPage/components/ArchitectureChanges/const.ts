export interface IVersion {
    id: number;
    num: number;
    date: string;
    succesFunctions: number;
    totalFunctions: number;
}

export const VERSIONS: IVersion[] = [
    { id: 7, num: 7, date: '23.09.2024, 00:00', succesFunctions: 45, totalFunctions: 100 },
    { id: 6, num: 6, date: '23.09.2024, 00:00', succesFunctions: 98, totalFunctions: 100 },
    { id: 5, num: 5, date: '23.09.2024, 00:00', succesFunctions: 1, totalFunctions: 100 },
    { id: 4, num: 4, date: '23.09.2024, 00:00', succesFunctions: 28, totalFunctions: 100 },
    { id: 3, num: 3, date: '23.09.2024, 00:00', succesFunctions: 100, totalFunctions: 100 },
    { id: 2, num: 2, date: '23.09.2024, 00:00', succesFunctions: 78, totalFunctions: 100 },
    { id: 1, num: 1, date: '23.09.2024, 00:00', succesFunctions: 84, totalFunctions: 100 },
];
