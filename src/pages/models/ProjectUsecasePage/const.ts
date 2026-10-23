import { BadgeSemantic } from 'components/ui';

import { ProjectUsecaseOperationStatus, ProjectUsecaseParticipantStatus } from 'api/usecase/types';

export const OPERATION_STATUS_DATA: Record<
    ProjectUsecaseOperationStatus,
    { label: string; semantic: BadgeSemantic }
> = {
    [ProjectUsecaseOperationStatus.CONFIRMED]: {
        label: 'Подтвержден',
        semantic: 'success',
    },
    [ProjectUsecaseOperationStatus.NOT_MAPPED]: {
        label: 'Не смапирован',
        semantic: 'danger',
    },
    [ProjectUsecaseOperationStatus.REVIEW]: {
        label: 'Ревью',
        semantic: 'warning',
    },
    [ProjectUsecaseOperationStatus.PLANNED]: {
        label: 'Планируется',
        semantic: 'neutral',
    },
};

export const STATUS_FILTER_OPTIONS = Object.values(ProjectUsecaseOperationStatus).map((status) => ({
    id: status,
    value: OPERATION_STATUS_DATA[status].label,
}));

export const PARTICIPANT_STATUS_DATA: Record<
    ProjectUsecaseParticipantStatus,
    { label: string; semantic: BadgeSemantic }
> = {
    [ProjectUsecaseParticipantStatus.CONFIRMED]: {
        label: 'Подтвержден',
        semantic: 'success',
    },
    [ProjectUsecaseParticipantStatus.NOT_CONFIRMED]: {
        label: 'Не подтвержден',
        semantic: 'danger',
    },
};
