import {
    IProjectUsecaseMappingDecision,
    IProjectUsecasePipelineOperation,
    IProjectUsecasePipelineParticipant,
} from 'api/staging-service/types';

import { CallDecisionType, IResolutionDraft } from '../../types';

export const getEmptyDraft = (productAlias?: string | null): IResolutionDraft => ({
    type: null,
    productAlias: productAlias ?? null,
    connectionOperation: null,
    interfaceName: '',
    interfaceCode: '',
    protocol: '',
    requirements: '',
});

export const getStepsCount = (operations: IProjectUsecasePipelineOperation[]) =>
    operations.reduce((count, operation) => count + operation.steps.length, 0);

export const isDecisionOperation = (operation: IProjectUsecasePipelineOperation) =>
    operation.status === 'unmapped' ||
    operation.source === 'architect_decision' ||
    operation.status === 'architect_specified' ||
    operation.status === 'planned';

export const isDraftComplete = (draft: IResolutionDraft | undefined): boolean => {
    switch (draft?.type) {
        case CallDecisionType.EXISTING:
            return Boolean(draft.productAlias && draft.connectionOperation);
        case CallDecisionType.DEVELOP:
            return Boolean(
                draft.productAlias && draft.interfaceCode.trim() && draft.requirements.trim(),
            );
        case CallDecisionType.EXISTS_UNSPECIFIED:
        case CallDecisionType.NOT_A_CALL:
            return true;
        default:
            return false;
    }
};

export const isOperationResolved = (
    operation: IProjectUsecasePipelineOperation,
    draft: IResolutionDraft | undefined,
) => (draft?.type ? isDraftComplete(draft) : operation.status !== 'unmapped');

export const orderDecisions = (
    decisions: IProjectUsecaseMappingDecision[],
): IProjectUsecaseMappingDecision[] => {
    const participants = new Set<string>();
    const productDecisions = decisions.filter((decision) => {
        if (decision.type !== 'product' || participants.has(decision.participant)) return false;
        participants.add(decision.participant);
        return true;
    });

    return [...productDecisions, ...decisions.filter(({ type }) => type !== 'product')];
};

export const getParticipantBadge = (participant: IProjectUsecasePipelineParticipant) => {
    if (participant.source === 'not_a_call') {
        return { label: 'Не является вызовом', semantic: 'neutral' as const };
    }
    return participant.resolved
        ? { label: 'Распознано', semantic: 'success' as const }
        : { label: 'Не распознано', semantic: 'danger' as const };
};

export const buildDecisions = (
    operation: IProjectUsecasePipelineOperation,
    draft: IResolutionDraft,
    participantProduct: string | undefined,
): IProjectUsecaseMappingDecision[] => {
    const { operationId, toAlias } = operation;

    switch (draft.type) {
        case CallDecisionType.EXISTING:
            if (!draft.productAlias || !draft.connectionOperation) return [];
            return [
                ...(participantProduct
                    ? []
                    : [
                          {
                              type: 'product' as const,
                              participant: toAlias,
                              productAlias: draft.productAlias,
                          },
                      ]),
                {
                    type: 'map_existing',
                    operationId,
                    connectionOperation: draft.connectionOperation,
                    participant: toAlias,
                    productAlias: draft.productAlias,
                },
            ];
        case CallDecisionType.DEVELOP:
            if (!draft.productAlias) return [];
            return [
                {
                    type: 'develop',
                    operationId,
                    productAlias: draft.productAlias,
                    interfaceCode: draft.interfaceCode.trim(),
                    interfaceName: draft.interfaceName.trim() || undefined,
                    protocol: draft.protocol.trim() || undefined,
                    requirements: draft.requirements.trim(),
                },
            ];
        case CallDecisionType.EXISTS_UNSPECIFIED:
            return [{ type: 'exists_unspecified', operationId }];
        case CallDecisionType.NOT_A_CALL:
            return [{ type: 'not_a_call', operationId }];
        default:
            return [];
    }
};
