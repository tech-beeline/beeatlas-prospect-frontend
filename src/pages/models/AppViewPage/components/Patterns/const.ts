export const PatternType = {
    ALL: 'Все',
    PATTERN: 'Паттерн',
    ANTIPATTERN: 'Антипаттерн',
} as const;

export type PatternTypeValue = typeof PatternType[keyof typeof PatternType];
