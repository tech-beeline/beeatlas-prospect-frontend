import type { AllStatuses } from 'components/ui';

import { ApplicationStatus } from 'api/applications/types';

export const statusAliasesWithInfoIcon = [ApplicationStatus.WTXCTR, ApplicationStatus.RW];

export const statusAliasToLabelTypeMap: Record<string, AllStatuses> = {
    [ApplicationStatus.WTXCTR]: 'teal',
    [ApplicationStatus.RW]: 'info',
    [ApplicationStatus.RFCTR]: 'warning',
    [ApplicationStatus.DN]: 'success',
    [ApplicationStatus.CNCL]: 'error',
};

export const statusAliasToTooltipTextMap: Record<string, string> = {
    [ApplicationStatus.WTXCTR]: 'Срок назначения исполнителя 3 рабочих дня',
    [ApplicationStatus.RW]: 'Cрок вынесения решения 2 рабочих дня',
};

export const editableStatusAliases = [ApplicationStatus.WTXCTR, ApplicationStatus.RFCTR];

export const reviewButtonsStatusAliases = [ApplicationStatus.WTXCTR, ApplicationStatus.RW];
