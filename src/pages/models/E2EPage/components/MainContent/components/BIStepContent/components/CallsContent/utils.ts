import { getDiscoveredOperationsById } from 'features/e2e';

import { IStagingSequenceCallsData } from 'api/staging-sequence/types';
import { formatNullableString } from 'utils/formatters';

import { ICallNode } from '../CallsWorkspace/types';

import { SUCCESS_OPERATION_STATUS, UNKNOWN_OPERATION_STATUS } from './const';
import { IE2EOperation, IE2EOperationRelation } from './types';

const formatMetric = (value: number | null | undefined) =>
    value === null || value === undefined ? formatNullableString(null) : String(value);

const buildCalls = (
    relations: IE2EOperationRelation[],
    discoveredOperationsById: Map<number, IE2EOperation>,
    pathPrefix = '',
): ICallNode[] =>
    [...relations]
        .sort((a, b) => a.order - b.order)
        .map((relation, index) => {
            const operation = discoveredOperationsById.get(relation.relatedOperationId);
            const id = `${pathPrefix}${index}-${relation.relatedOperationId}-${relation.order}`;
            const call = operation
                ? `${operation.type} ${operation.name}`
                : `Unknown operation #${relation.relatedOperationId}`;

            return {
                id,
                call,
                product: operation?.productAlias ?? null,
                status: operation ? SUCCESS_OPERATION_STATUS : UNKNOWN_OPERATION_STATUS,
                fields: [
                    { label: 'Метод', value: call },
                    { label: 'Тип', value: formatNullableString(operation?.type) },
                    { label: 'Стереотип', value: formatNullableString(relation.stereotype) },
                    { label: 'Путь', value: formatNullableString(operation?.name) },
                    { label: 'RPS', value: formatMetric(operation?.sla?.rps) },
                    { label: 'Latency', value: formatMetric(operation?.sla?.latency) },
                    { label: 'Error rate', value: formatMetric(operation?.sla?.errorRate) },
                    { label: 'Интерфейс', value: formatNullableString(operation?.interfaceCode) },
                    { label: 'Контейнер', value: formatNullableString(operation?.containerCode) },
                ],
                children: relation.operationsRelations?.length
                    ? buildCalls(relation.operationsRelations, discoveredOperationsById, `${id}/`)
                    : [],
            };
        });

export const buildE2ECalls = (data: IStagingSequenceCallsData | undefined): ICallNode[] => {
    if (!data) return [];

    const discoveredOperationsById = getDiscoveredOperationsById(data);

    return buildCalls(data.operationsRelations, discoveredOperationsById);
};
