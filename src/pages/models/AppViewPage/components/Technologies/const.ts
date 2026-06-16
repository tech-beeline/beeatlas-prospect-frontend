export const RingStatus = {
    ALL: 'Все',
} as const;

export const RING_STATUS_SELECT_OPTIONS: { value: string }[] = [
    { value: RingStatus.ALL },
    { value: 'Adopt' },
    { value: 'Trial' },
    { value: 'Assess' },
    { value: 'Hold' },
];
