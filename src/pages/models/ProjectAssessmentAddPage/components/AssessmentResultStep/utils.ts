import { AssessmentResults } from 'api/projects/types';

export const getImpactLevel = (tcCount: number) => {
    if (tcCount >= 5) return AssessmentResults.XL;
    if (tcCount >= 3) return AssessmentResults.L;
    if (tcCount === 2) return AssessmentResults.M;
    return AssessmentResults.S;
};
