import { IProjectUsecasePipelineOperation } from 'api/staging-service/types';

export const getCardTitle = (operation: IProjectUsecasePipelineOperation) => {
    const partIds = operation.steps.map(({ partId }) => partId).join(', ');
    const callers = [...new Set(operation.steps.map(({ fromAlias }) => fromAlias))].join(', ');

    return [
        partIds || operation.operationId,
        callers,
        '—',
        operation.toAlias,
        operation.type,
        operation.path,
    ].join(' ');
};
