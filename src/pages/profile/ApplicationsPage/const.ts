import { TabVariant } from 'features/applications';

import { ApplicationStatus } from 'api/applications/types';

export const APPLICATIONS_PER_PAGE = 15;

export const TABS = [
    { label: 'Активные', value: TabVariant.ACTIVE },
    { label: 'Завершенные', value: TabVariant.REVIEWED },
    // { label: 'Черновики', value: TabVariant.DRAFT },
];

export const availableStatusAliasesForTab: Record<string, string[]> = {
    [TabVariant.ACTIVE]: [ApplicationStatus.WTXCTR, ApplicationStatus.RW, ApplicationStatus.RFCTR],
    [TabVariant.REVIEWED]: [ApplicationStatus.DN, ApplicationStatus.CNCL],
};
