import { BadgeSemantic } from 'components/ui';

import { AssessmentResults, ProjectStatuses } from 'api/projects/types';

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
