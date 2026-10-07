import { BadgeSemantic } from 'components/ui';

import { UsecaseMethodStatus } from './types';

export const USECASE_INTERFACE_SOURCE = 'usecase';

export const usecaseMethodStatusBadge: Record<
    UsecaseMethodStatus,
    { label: string; semantic: BadgeSemantic }
> = {
    [UsecaseMethodStatus.IMPLEMENTED]: { label: 'Реализован', semantic: 'success' },
    [UsecaseMethodStatus.PLANNED]: { label: 'Планируется', semantic: 'neutral' },
    [UsecaseMethodStatus.REVIEW]: { label: 'На ревью', semantic: 'info' },
    [UsecaseMethodStatus.NOT_MAPPED]: { label: 'Не сопоставлен', semantic: 'warning' },
};
