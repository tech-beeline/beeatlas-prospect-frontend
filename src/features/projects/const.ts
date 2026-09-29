import { BadgeSemantic } from 'components/ui';

import { AssessmentResults, ProjectStatuses } from 'api/projects/types';
import {
    ProjectUsecaseApplicationStatus,
    ProjectUsecaseCallStatus,
    ProjectUsecaseImportStatus,
    ProjectUsecaseSource,
    ProjectUsecaseStatus,
} from 'api/usecase/types';

export const projectStatusToNameMap: Record<ProjectStatuses, string> = {
    [ProjectStatuses.BACKLOG]: 'Бэклог',
    [ProjectStatuses.INWORK]: 'В работе',
    [ProjectStatuses.DONE]: 'Завершён',
};

export const projectStatusToSemanticMap: Record<ProjectStatuses, BadgeSemantic> = {
    [ProjectStatuses.BACKLOG]: 'neutral',
    [ProjectStatuses.INWORK]: 'info',
    [ProjectStatuses.DONE]: 'success',
};

export const assessmentResultToNameMap: Record<AssessmentResults, string> = {
    [AssessmentResults.S]: 'Минимальная S',
    [AssessmentResults.M]: 'Низкая M',
    [AssessmentResults.L]: 'Средняя L',
    [AssessmentResults.XL]: 'Высокая XL',
};

export const assessmentResultToSemanticMap: Record<AssessmentResults, BadgeSemantic> = {
    [AssessmentResults.S]: 'success',
    [AssessmentResults.M]: 'neutral',
    [AssessmentResults.L]: 'warning',
    [AssessmentResults.XL]: 'danger',
};

export const projectUsecaseStatusToNameMap: Record<ProjectUsecaseStatus, string> = {
    [ProjectUsecaseStatus.PUBLISHED]: 'Опубликован',
};

export const projectUsecaseStatusToSemanticMap: Record<ProjectUsecaseStatus, BadgeSemantic> = {
    [ProjectUsecaseStatus.PUBLISHED]: 'success',
};

export const projectUsecaseSourceToNameMap: Record<ProjectUsecaseSource, string> = {
    [ProjectUsecaseSource.MANUAL_IMPORT]: 'Ручной импорт',
};

export const projectUsecaseCallStatusToNameMap: Record<ProjectUsecaseCallStatus, string> = {
    [ProjectUsecaseCallStatus.CONFIRMED]: 'Подтверждён',
    [ProjectUsecaseCallStatus.PLANNED]: 'Планируется',
};

export const projectUsecaseCallStatusToSemanticMap: Record<
    ProjectUsecaseCallStatus,
    BadgeSemantic
> = {
    [ProjectUsecaseCallStatus.CONFIRMED]: 'success',
    [ProjectUsecaseCallStatus.PLANNED]: 'neutral',
};

export const projectUsecaseApplicationStatusToNameMap: Record<
    ProjectUsecaseApplicationStatus,
    string
> = {
    [ProjectUsecaseApplicationStatus.RECOGNIZED]: 'Распознано',
    [ProjectUsecaseApplicationStatus.UNRECOGNIZED]: 'Не распознано',
};

export const projectUsecaseApplicationStatusToSemanticMap: Record<
    ProjectUsecaseApplicationStatus,
    BadgeSemantic
> = {
    [ProjectUsecaseApplicationStatus.RECOGNIZED]: 'success',
    [ProjectUsecaseApplicationStatus.UNRECOGNIZED]: 'danger',
};

export const projectUsecaseImportStatusToNameMap: Record<ProjectUsecaseImportStatus, string> = {
    [ProjectUsecaseImportStatus.APPLIED]: 'Применён',
    [ProjectUsecaseImportStatus.ERROR]: 'Ошибка',
    [ProjectUsecaseImportStatus.CANCELLED]: 'Отменён',
    [ProjectUsecaseImportStatus.IN_PROGRESS]: 'В процессе',
};

export const projectUsecaseImportStatusToSemanticMap: Record<
    ProjectUsecaseImportStatus,
    BadgeSemantic
> = {
    [ProjectUsecaseImportStatus.APPLIED]: 'success',
    [ProjectUsecaseImportStatus.ERROR]: 'danger',
    [ProjectUsecaseImportStatus.CANCELLED]: 'neutral',
    [ProjectUsecaseImportStatus.IN_PROGRESS]: 'info',
};
