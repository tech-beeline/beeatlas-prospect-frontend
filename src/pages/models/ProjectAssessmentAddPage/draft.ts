import { AssessmentResults } from 'api/projects/types';

import { AssessmentStepVariants, createInitialAssessmentData } from './const';

export type ProcessState = 'idle' | 'starting' | 'processing' | 'done' | 'error';

export const createDraft = () => ({
    version: 1,
    stepVariant: AssessmentStepVariants.BUSINESS_STATEMENT,
    savedData: createInitialAssessmentData(),
    requirementsState: 'idle' as ProcessState,
    requirementsTaskId: null as string | null,
    requirementsStartedAt: null as number | null,
    technicalState: 'idle' as ProcessState,
    technicalTaskId: null as string | null,
    technicalStartedAt: null as number | null,
    catalogState: 'idle' as ProcessState,
    catalogTaskId: null as string | null,
    catalogStartedAt: null as number | null,
    assessmentState: 'idle' as ProcessState,
    assessmentStartedAt: null as number | null,
    impactLevel: AssessmentResults.S,
});
export type AssessmentDraft = ReturnType<typeof createDraft>;
export const draftKey = (projectId: string) => `project-assessment:v1:${projectId}`;

export interface IDraftReadResult {
    draft: AssessmentDraft;
    hasError: boolean;
}

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

export const readDraft = (projectId: string): IDraftReadResult => {
    const initial = createDraft();
    try {
        const storedDraft = localStorage.getItem(draftKey(projectId));
        if (storedDraft === null) return { draft: initial, hasError: false };

        const value = JSON.parse(storedDraft);
        if (
            !value ||
            value.version !== 1 ||
            !Object.values(AssessmentStepVariants).includes(value.stepVariant)
        )
            return { draft: initial, hasError: true };
        const data = value.savedData;
        if (
            !data ||
            !Array.isArray(data.requirements) ||
            (data.selectedRequirementIds !== undefined &&
                (!Array.isArray(data.selectedRequirementIds) ||
                    !data.selectedRequirementIds.every((id: unknown) => typeof id === 'string'))) ||
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
            return { draft: initial, hasError: true };
        for (const field of [
            'confluenceUrl',
            'businessDescription',
            'rawText',
            'taskDescription',
            'pageName',
            'parentUrl',
        ] as const) {
            if (typeof data[field] !== 'string') return { draft: initial, hasError: true };
        }
        const draft: AssessmentDraft = {
            ...initial,
            stepVariant: value.stepVariant,
            savedData: {
                ...initial.savedData,
                ...data,
                confluencePat: '',
                selectedRequirementIds: Array.isArray(data.selectedRequirementIds)
                    ? Array.from(new Set<string>(data.selectedRequirementIds))
                    : [],
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
            const startedAt = value[`${prefix}StartedAt`];
            draft[`${prefix}StartedAt`] =
                typeof startedAt === 'number' && Number.isFinite(startedAt) ? startedAt : null;
        }
        draft.assessmentState = value.assessmentState === 'done' ? 'done' : 'idle';
        draft.assessmentStartedAt =
            typeof value.assessmentStartedAt === 'number' &&
            Number.isFinite(value.assessmentStartedAt)
                ? value.assessmentStartedAt
                : null;
        return { draft, hasError: false };
    } catch {
        return { draft: initial, hasError: true };
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
