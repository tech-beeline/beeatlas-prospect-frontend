import { IAssessmentFormData } from './types';

export enum AssessmentStepVariants {
    BUSINESS_STATEMENT = 'BUSINESS_STATEMENT',
    REQUIREMENTS = 'REQUIREMENTS',
    TECHNICAL_CAPABILITIES = 'TECHNICAL_CAPABILITIES',
    ASSESSMENT = 'ASSESSMENT',
}

export const ASSESSMENT_STEPS = [
    { id: AssessmentStepVariants.BUSINESS_STATEMENT, label: 'Бизнес-постановка', index: 0 },
    { id: AssessmentStepVariants.REQUIREMENTS, label: 'Требования', index: 1 },
    { id: AssessmentStepVariants.TECHNICAL_CAPABILITIES, label: 'ТС', index: 2 },
    { id: AssessmentStepVariants.ASSESSMENT, label: 'Оценка', index: 3 },
];

export const createInitialAssessmentData = (): IAssessmentFormData => ({
    confluenceUrl: '',
    confluencePat: '',
    businessDescription: '',

    requirements: [],
    selectedRequirementIds: [],

    businessCapabilities: [],

    technicalCapabilities: [],

    createdDate: new Date().toISOString(),

    rawText: '',
    taskDescription: '',
    sourceSignature: '',
    candidateIndex: 0,
    pageName: '',
    parentUrl: '',
});
