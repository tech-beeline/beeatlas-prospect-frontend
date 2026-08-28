import { BadgeSemantic } from 'components/ui';

import { AssessmentResults, ProjectStatuses } from 'api/projects/types';
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
