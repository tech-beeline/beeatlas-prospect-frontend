export const COLUMNS_LENGTH = 3;

export const DisplayOptions = {
    GRID: 'GRID',
    TABLE: 'TABLE',
} as const;

export type DisplayOptions = typeof DisplayOptions[keyof typeof DisplayOptions];
