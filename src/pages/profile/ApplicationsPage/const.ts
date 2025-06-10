import { TabVariant } from 'features/applications';

export const APPLICATIONS_PER_PAGE = 15;

export const TABS = [
    { label: 'Активные', value: TabVariant.ACTIVE },
    { label: 'Завершенные', value: TabVariant.REVIEWED },
    // { label: 'Черновики', value: TabVariant.DRAFT },
];

export const availableStatusIdsForTab: Record<string, number[]> = {
    [TabVariant.ACTIVE]: [1, 2, 3, 6, 7, 8],
    [TabVariant.REVIEWED]: [4, 5, 9, 10],
};
