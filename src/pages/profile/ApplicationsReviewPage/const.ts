import { TabVariant } from 'features/applications';

export const APPLICATIONS_PER_PAGE = 15;

export const TABS = [
    { label: 'Ожидают исполнителя', value: TabVariant.AWAITING_EXECUTOR },
    { label: 'Ожидают решения', value: TabVariant.AWAITING_DECISION },
    { label: 'История решений', value: TabVariant.HISTORY },
];

export const availableStatusIdsForTab: Record<string, number[]> = {
    [TabVariant.AWAITING_EXECUTOR]: [1, 6],
    [TabVariant.AWAITING_DECISION]: [2, 3, 7, 8],
    [TabVariant.HISTORY]: [4, 5, 9, 10],
};
