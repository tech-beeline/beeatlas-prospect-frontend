import { IBCCandidate, IStructureRequirement } from 'api/projects';
import { ICatalogBusinessCapability, ICatalogTechnicalCapability } from 'api/queries/projects';

export type TechnicalCapabilityDecision = 'pending' | 'reused' | 'new' | 'excluded';
export type TechnicalCapabilityOrigin = 'discovered' | 'manual';

export interface IAssessmentTechnicalCapability {
    id: string;
    name: string;
    description: string;
    rationale: string;
    score: number;
    frIds: string[];
    systems: string[];
    matches: ICatalogBusinessCapability[];
    decision: TechnicalCapabilityDecision;
    origin?: TechnicalCapabilityOrigin;
    selectedCapabilities?: ICatalogTechnicalCapability[];
    system?: { code: string; name: string };
    parentBc?: { code: string; name: string; description?: string };
    selectedCapability?: ICatalogTechnicalCapability;
}

export interface IAssessmentFormData {
    confluenceUrl: string;
    confluencePat: string;
    businessDescription: string;

    requirements: IStructureRequirement[];

    businessCapabilities: IBCCandidate[];

    technicalCapabilities: IAssessmentTechnicalCapability[];

    createdDate: string;

    rawText: string;
    taskDescription: string;
    sourceSignature: string;
    candidateIndex: number;
    pageName: string;
    parentUrl: string;
}
