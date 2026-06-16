import { TabVariant } from 'features/applications';

import { ApplicationStatus } from 'api/applications/types';

export const APPLICATIONS_PER_PAGE = 15;

export const TABS = [
    { label: 'Ожидают исполнителя', value: TabVariant.AWAITING_EXECUTOR },
    { label: 'Ожидают решения', value: TabVariant.AWAITING_DECISION },
    { label: 'История решений', value: TabVariant.HISTORY },
];

export const availableStatusAliasesForTab: Record<string, string[]> = {
    [TabVariant.AWAITING_EXECUTOR]: [ApplicationStatus.WTXCTR],
    [TabVariant.AWAITING_DECISION]: [ApplicationStatus.RW, ApplicationStatus.RFCTR],
    [TabVariant.HISTORY]: [ApplicationStatus.DN, ApplicationStatus.CNCL],
};
