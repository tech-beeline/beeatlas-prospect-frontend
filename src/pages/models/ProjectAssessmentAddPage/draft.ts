import { AssessmentResults } from 'api/projects/types';

import { AssessmentStepVariants, createInitialAssessmentData } from './const';

export type ProcessState = 'idle' | 'starting' | 'processing' | 'done' | 'error';

export const createDraft = () => ({
    version: 1,
    stepVariant: AssessmentStepVariants.BUSINESS_STATEMENT,
    savedData: createInitialAssessmentData(),
    requirementsState: 'idle' as ProcessState,
    requirementsTaskId: null as string | null,
    technicalState: 'idle' as ProcessState,
    technicalTaskId: null as string | null,
    catalogState: 'idle' as ProcessState,
    catalogTaskId: null as string | null,
    assessmentState: 'idle' as ProcessState,
    impactLevel: AssessmentResults.S,
});
export type AssessmentDraft = ReturnType<typeof createDraft>;
export const draftKey = (projectId: string) => `project-assessment:v1:${projectId}`;

const isSystem = (value: any) =>
    value === undefined ||
    (value && typeof value.code === 'string' && typeof value.name === 'string');
const isCatalogTc = (value: any) =>
    value &&
    typeof value.id === 'string' &&
    typeof value.code === 'string' &&
    typeof value.name === 'string' &&
    typeof value.description === 'string' &&
    Array.isArray(value.systems) &&
    value.systems.every((code: unknown) => typeof code === 'string') &&
    isSystem(value.system) &&
    isSystem(value.parentBc);
const isCatalogBc = (value: any) =>
    value &&
    typeof value.id === 'string' &&
    typeof value.code === 'string' &&
    typeof value.name === 'string' &&
    Array.isArray(value.technicalCapabilities) &&
    value.technicalCapabilities.every(isCatalogTc);

export const readDraft = (projectId: string): AssessmentDraft => {
    const initial = createDraft();
    try {
        const value = JSON.parse(localStorage.getItem(draftKey(projectId)) || 'null');
        if (
            !value ||
            value.version !== 1 ||
            !Object.values(AssessmentStepVariants).includes(value.stepVariant)
        )
            return initial;
        const data = value.savedData;
        if (
            !data ||
            !Array.isArray(data.requirements) ||
            !Array.isArray(data.technicalCapabilities) ||
            !data.requirements.every(
                (r: any) =>
                    r &&
                    typeof r.id === 'string' &&
                    typeof r.title === 'string' &&
                    typeof r.description === 'string' &&
                    ['FR', 'NFR', 'OQ'].includes(r.type),
            ) ||
            !data.technicalCapabilities.every(
                (tc: any) =>
                    tc &&
                    typeof tc.id === 'string' &&
                    typeof tc.name === 'string' &&
                    Array.isArray(tc.systems) &&
                    Array.isArray(tc.matches) &&
                    Array.isArray(tc.frIds) &&
                    tc.frIds.every((id: unknown) => typeof id === 'string') &&
                    tc.matches.every(isCatalogBc) &&
                    isSystem(tc.system) &&
                    isSystem(tc.parentBc) &&
                    (tc.selectedCapability === undefined || isCatalogTc(tc.selectedCapability)) &&
                    (tc.selectedCapabilities === undefined ||
                        (Array.isArray(tc.selectedCapabilities) &&
                            tc.selectedCapabilities.every(isCatalogTc))) &&
                    (tc.origin === undefined || ['discovered', 'manual'].includes(tc.origin)) &&
                    ['pending', 'new', 'reused', 'excluded'].includes(tc.decision),
            )
        )
            return initial;
        for (const field of [
            'confluenceUrl',
            'businessDescription',
            'rawText',
            'taskDescription',
            'pageName',
            'parentUrl',
        ] as const) {
            if (typeof data[field] !== 'string') return initial;
        }
        const draft: AssessmentDraft = {
            ...initial,
            stepVariant: value.stepVariant,
            savedData: {
                ...initial.savedData,
                ...data,
                confluencePat: '',
                candidateIndex:
                    Number.isInteger(data.candidateIndex) && data.candidateIndex >= 0
                        ? data.candidateIndex
                        : 0,
            },
            impactLevel: Object.values(AssessmentResults).includes(value.impactLevel)
                ? value.impactLevel
                : initial.impactLevel,
        };
        for (const prefix of ['requirements', 'technical', 'catalog'] as const) {
            const taskId = value[`${prefix}TaskId`];
            const state = value[`${prefix}State`];
            draft[`${prefix}TaskId`] = typeof taskId === 'string' ? taskId : null;
            draft[`${prefix}State`] =
                state === 'processing' && draft[`${prefix}TaskId`]
                    ? 'processing'
                    : state === 'done'
                    ? 'done'
                    : state === 'idle'
                    ? 'idle'
                    : 'error';
        }
        draft.assessmentState = value.assessmentState === 'done' ? 'done' : 'idle';
        return draft;
    } catch {
        return initial;
    }
};

export const writeDraft = (projectId: string, draft: AssessmentDraft) => {
    localStorage.setItem(
        draftKey(projectId),
        JSON.stringify({ ...draft, savedData: { ...draft.savedData, confluencePat: '' } }),
    );
};

export const removeDraft = (projectId: string) => {
    localStorage.removeItem(draftKey(projectId));
};
