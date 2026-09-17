import { IProjectAssessment } from 'api/projects/types';

export interface IAssessmentCard {
    assessment: IProjectAssessment;
    current: boolean;
}
