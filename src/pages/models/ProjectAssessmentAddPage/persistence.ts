import { StructureRequirementType } from 'api/projects';
import { AssessmentResults, ICreateAssessmentDto } from 'api/projects/types';

import { confirmedTcs } from './impact';
import { IAssessmentFormData } from './types';

export const buildCreateAssessmentDto = (
    projectId: number,
    savedData: IAssessmentFormData,
    impactLevel: AssessmentResults,
): ICreateAssessmentDto => {
    const requirements = (type: StructureRequirementType) =>
        savedData.requirements
            .filter((requirement) => requirement.type === type)
            .map(({ id, title, description }) => ({ uniqueIdent: id, title, description }));
    const impactTcs = confirmedTcs(savedData.technicalCapabilities);

    return {
        projectId,
        source: savedData.confluenceUrl ? 'confluence' : 'text',
        sourceUrl: savedData.confluenceUrl,
        rawText: savedData.rawText,
        taskDescription: savedData.taskDescription,
        impactLevel,
        requirementsFunc: requirements(StructureRequirementType.FR),
        requirementsNonFunc: requirements(StructureRequirementType.NFR),
        openQuestions: savedData.requirements
            .filter(({ type }) => type === StructureRequirementType.OQ)
            .map(({ id, title }) => ({ uniqueIdent: id, questionText: title })),
        tc: impactTcs
            .filter(({ action }) => action === 'reuse')
            .map(({ code, fr_ids, parent_bc, system }) => ({
                tcCode: code,
                productAlias: system?.code ?? '',
                productName: system?.name ?? '',
                parentBcCode: parent_bc?.code ?? '',
                frIds: fr_ids,
            })),
        designTc: impactTcs
            .filter(({ action }) => action === 'create_new')
            .map(({ name, description, fr_ids, parent_bc, system }) => ({
                name,
                description,
                productAlias: system?.code ?? '',
                productName: system?.name ?? '',
                parentBcCode: parent_bc?.code ?? '',
                frIds: fr_ids,
            })),
    };
};
