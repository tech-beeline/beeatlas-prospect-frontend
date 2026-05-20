import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

import { ITreeItem } from './types';

const formatOperationNodeName = (
    operationRef: IStagingSequenceCallsData['operation_refs'][number] | undefined,
    operationRefId: number,
): string => {
    if (!operationRef) {
        return `Unknown operation #${operationRefId}`;
    }

    const parts: string[] = [
        operationRef.name || operationRef.uid || `Operation #${operationRefId}`,
    ];

    if (typeof operationRef.rps === 'number') {
        parts.push(`rps=${operationRef.rps}`);
    }
    if (typeof operationRef.latency === 'number') {
        parts.push(`latency=${operationRef.latency}`);
    }
    if (typeof operationRef.error_rate === 'number') {
        parts.push(`error_rate=${operationRef.error_rate}`);
    }
    if (operationRef.interface_code) {
        parts.push(`interface=${operationRef.interface_code}`);
    }
    if (operationRef.container_code) {
        parts.push(`container=${operationRef.container_code}`);
    }
    if (operationRef.product_code) {
        parts.push(`product=${operationRef.product_code}`);
    }

    return parts.join('; ');
};

export const formatCallsTreeData = (data: IStagingSequenceCallsData | undefined): ITreeItem[] => {
    if (!data) {
        return [];
    }

    const roots = [...(data.bi_step_relations ?? [])].sort((a, b) => a.call_order - b.call_order);
    const relations = data.operation_relations ?? [];
    const refsById = new Map((data.operation_refs ?? []).map((item) => [item.id, item]));

    const relationsByOperationRefId = relations.reduce<
        Map<number, IStagingSequenceCallsData['operation_relations']>
    >((acc, relation) => {
        const current = acc.get(relation.operation_ref_id) ?? [];
        current.push(relation);
        acc.set(relation.operation_ref_id, current);
        return acc;
    }, new Map());

    const buildChildren = (operationRefId: number, visited: Set<number>): ITreeItem[] => {
        if (visited.has(operationRefId)) {
            return [];
        }

        const nestedRelations = [...(relationsByOperationRefId.get(operationRefId) ?? [])].sort(
            (a, b) => a.call_order - b.call_order,
        );

        if (!nestedRelations.length) {
            return [];
        }

        const nextVisited = new Set(visited);
        nextVisited.add(operationRefId);

        return nestedRelations.map((relation) => {
            const childOperationRefId = relation.related_operation_ref_id;
            const childOperationRef = refsById.get(childOperationRefId);

            return {
                name: formatOperationNodeName(childOperationRef, childOperationRefId),
                children: buildChildren(childOperationRefId, nextVisited),
            };
        });
    };

    return roots.map((root) => {
        const operationRef = refsById.get(root.operation_ref_id);

        return {
            name: formatOperationNodeName(operationRef, root.operation_ref_id),
            children: buildChildren(root.operation_ref_id, new Set()),
        };
    });
};
