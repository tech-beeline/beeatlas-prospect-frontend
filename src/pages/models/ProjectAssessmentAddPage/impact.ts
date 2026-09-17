import { AssessmentResults } from 'api/projects/types';

import { IAssessmentTechnicalCapability } from './types';

export const confirmedTcs = (candidates: IAssessmentTechnicalCapability[]) =>
    candidates.flatMap((candidate) => {
        if (candidate.decision === 'new')
            return [
                {
                    code: candidate.id,
                    name: candidate.name,
                    description: candidate.description,
                    relevance: candidate.score,
                    action: 'create_new',
                    source: 'new',
                    fr_ids: candidate.frIds,
                    system: candidate.system,
                    parent_bc: candidate.parentBc,
                },
            ];
        if (candidate.decision !== 'reused') return [];
        return (
            candidate.selectedCapabilities ||
            (candidate.selectedCapability ? [candidate.selectedCapability] : [])
        ).map((tc) => ({
            code: tc.code,
            name: tc.name,
            description: tc.description,
            relevance: tc.relevance,
            action: 'reuse',
            source: 'landscape',
            fr_ids: candidate.frIds,
            system: tc.system,
            parent_bc: tc.parentBc,
        }));
    });

export const buildImpact = (candidates: IAssessmentTechnicalCapability[]) => {
    const tcs = confirmedTcs(candidates);
    const systems = Array.from(
        new Set(tcs.map((tc) => tc.system?.code).filter((code): code is string => !!code)),
    );
    const impactLevel =
        systems.length >= 5
            ? AssessmentResults.XL
            : systems.length >= 3
            ? AssessmentResults.L
            : systems.length === 2
            ? AssessmentResults.M
            : AssessmentResults.S;
    return { tcs, systems, impactLevel };
};
