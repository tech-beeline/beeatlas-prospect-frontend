import { IStepsScenarion } from 'api/bi/types';
import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

import { IRootCall, ITreeItem } from './types';

const USER_TASK_STEP_TYPE = 'UserTask';

export const isLinkableBIStep = (biStep: Pick<IStepsScenarion, 'nameStepType' | 'type'>) =>
    (biStep.nameStepType ?? biStep.type) !== USER_TASK_STEP_TYPE;

export const isBIStepCodeSearch = (code: string, search: string) =>
    Boolean(search.trim()) &&
    code.toLocaleLowerCase('ru') === search.trim().toLocaleLowerCase('ru');

type IOperation = IStagingSequenceCallsData['discoveredOperations'][number];
type IOperationRelation = IStagingSequenceCallsData['operationsRelations'][number];

export const withConnectedOperation = (operation: IOperation): IOperation => {
    const connected = operation.operation;
    if (!connected) return operation;

    return {
        ...operation,
        sla: {
            rps: connected.sla?.rps ?? operation.sla?.rps ?? null,
            latency: connected.sla?.latency ?? operation.sla?.latency ?? null,
            errorRate: connected.sla?.errorRate ?? operation.sla?.errorRate ?? null,
        },
        interfaceCode: connected.interface?.code ?? operation.interfaceCode,
        containerCode: connected.interface?.container?.code ?? operation.containerCode,
    };
};

export const getDiscoveredOperationsById = (data: IStagingSequenceCallsData) =>
    new Map(
        data.discoveredOperations.map((operation) => [
            operation.id,
            withConnectedOperation(operation),
        ]),
    );

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
    discoveredOperationsById: Map<number, IOperation>,
    pathPrefix = '',
): ITreeItem[] =>
    [...relations]
        .sort((a, b) => a.order - b.order)
        .map((relation, index) => {
            const operation = discoveredOperationsById.get(relation.relatedOperationId);
            const id = `${pathPrefix}${index}-${relation.relatedOperationId}-${relation.order}`;

            return {
                id,
                name: formatOperationNodeName(relation, operation),
                children: relation.operationsRelations?.length
                    ? buildTreeItems(
                          relation.operationsRelations,
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

    const discoveredOperationsById = getDiscoveredOperationsById(data);

    return buildTreeItems(data.operationsRelations, discoveredOperationsById);
};

export const formatRootCalls = (data: IStagingSequenceCallsData | undefined): IRootCall[] => {
    if (!data) {
        return [];
    }

    const discoveredOperationsById = getDiscoveredOperationsById(data);

    return [...data.operationsRelations]
        .sort((a, b) => a.order - b.order)
        .map((relation, index) => {
            const operation = discoveredOperationsById.get(relation.relatedOperationId) ?? null;
            return {
                id: `${index}-${relation.relatedOperationId}-${relation.order}`,
                stereotype: relation.stereotype,
                operation,
                operationId: operation?.operation?.id ?? null,
            };
        });
};
