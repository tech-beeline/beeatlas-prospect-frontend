import { TabVariant } from 'features/applications';

import { ApplicationStatus } from 'api/applications/types';

export const MY_APPS_PREVIEW_COUNT = 2;

export const availableStatusAliasesForTab: Record<string, string[]> = {
    [TabVariant.ACTIVE]: [ApplicationStatus.WTXCTR, ApplicationStatus.RW, ApplicationStatus.RFCTR],
    [TabVariant.REVIEWED]: [ApplicationStatus.DN, ApplicationStatus.CNCL],
};
