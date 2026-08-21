import { EntityRelationType, IStagingSequenceCallsData } from 'api/staging-sequence/types';

import { ITreeItem } from './types';

type IOperation = IStagingSequenceCallsData['operations'][number];
type IOperationRelation = IStagingSequenceCallsData['operationsRelations'][number];

const formatOperationNodeName = (
    relation: IOperationRelation,
    operation: IOperation | undefined,
): string => {
    if (!operation) {
        return `Unknown operation #${relation.relatedOperationId}`;
    }

    const label = [
        relation.stereotype,
        operation.type,
        `${operation.name};`,
        `rps=${operation.sla?.rps};`,
        `latency=${operation.sla?.latency};`,
        `error_rate=${operation.sla?.errorRate};`,
        `interface=${operation.interfaceCode};`,
        operation.containerCode ? `container=${operation.containerCode};` : '',
        `product=${operation.productAlias}`,
    ].join(' ');

    return label;
};

const buildTreeItems = (
    relations: IOperationRelation[],
    operationsById: Map<number, IOperation>,
    discoveredOperationsById: Map<number, IOperation>,
    pathPrefix = '',
): ITreeItem[] =>
    [...relations]
        .sort((a, b) => a.order - b.order)
        .map((relation, index) => {
            const operation =
                relation.entityTypeRelatedOperation === EntityRelationType.OPERATION
                    ? operationsById.get(relation.relatedOperationId)
                    : discoveredOperationsById.get(relation.relatedOperationId);
            const id = `${pathPrefix}${index}-${relation.relatedOperationId}-${relation.order}`;

            return {
                id,
                name: formatOperationNodeName(relation, operation),
                children: relation.operationsRelations?.length
                    ? buildTreeItems(
                          relation.operationsRelations,
                          operationsById,
                          discoveredOperationsById,
                          `${id}/`,
                      )
                    : [],
            };
        });

export const formatCallsTreeData = (data: IStagingSequenceCallsData | undefined): ITreeItem[] => {
    if (!data) {
        return [];
    }

    const operationsById = new Map(data.operations.map((operation) => [operation.id, operation]));
    const discoveredOperationsById = new Map(
        data.discoveredOperations.map((operation) => [operation.id, operation]),
    );

    return buildTreeItems(data.operationsRelations, operationsById, discoveredOperationsById);
};
