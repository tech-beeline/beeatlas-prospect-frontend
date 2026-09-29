import { BadgeSemantic } from 'components/ui';

import { AssessmentResults, ProjectStatuses } from 'api/projects/types';
import { IProjectUsecaseDetails } from 'api/usecase';
import { formatNullableString } from 'utils/formatters';

import {
    assessmentResultToNameMap,
    assessmentResultToSemanticMap,
    projectStatusToNameMap,
    projectStatusToSemanticMap,
} from './const';

export const getProjectStatusName = (status: ProjectStatuses | null): string =>
    status ? projectStatusToNameMap[status] : formatNullableString(status);

export const getProjectStatusSemantic = (status: ProjectStatuses | null): BadgeSemantic =>
    status ? projectStatusToSemanticMap[status] : 'neutral';

export const getProjectAssessmentName = (status: AssessmentResults | null): string =>
    status ? assessmentResultToNameMap[status] : 'Не оценен';

export const getProjectAssessmentSemantic = (status: AssessmentResults | null): BadgeSemantic =>
    status ? assessmentResultToSemanticMap[status] : 'neutral';

export const getProjectUsecaseLatestDate = (
    usecase: Pick<IProjectUsecaseDetails, 'createdDate' | 'updatedDate'>,
) => {
    if (!usecase.updatedDate) return usecase.createdDate;

    return Date.parse(usecase.updatedDate) > Date.parse(usecase.createdDate)
        ? usecase.updatedDate
        : usecase.createdDate;
};
