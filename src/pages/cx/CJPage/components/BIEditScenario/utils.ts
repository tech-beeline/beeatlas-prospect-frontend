import { IRelationForm, IRelations } from 'api/bi/types';

import { FormValues } from './form';
import { ManualCallEditor } from './types';

export const relationToFormValues = (
    relation: IRelations,
    index: number,
): FormValues['steps'][number] => ({
    id: relation.id,
    product: relation.productId,
    tc: relation.tcId,
    iface: relation.interfaceId,
    operation: relation.operationId,
    description: relation.description ?? '',
    stepName:
        relation.description ||
        relation.tcName ||
        relation.operation ||
        relation.interfaceName ||
        relation.productName ||
        `Вызов ${index + 1}`,
});

export const relationToDto = (relation: IRelations): IRelationForm => ({
    id: relation.id,
    description: relation.description ?? '',
    productId: relation.productId ?? null,
    tcId: relation.tcId ?? null,
    interfaceId: relation.interfaceId ?? null,
    operationId: relation.operationId ?? null,
});

export const buildRelationsUpdate = (
    relations: IRelations[],
    steps: FormValues['steps'],
    editor: ManualCallEditor,
): IRelationForm[] => {
    const updated = steps.map((step) => ({
        id: step.id ?? undefined,
        description: step.description,
        productId: step.product ?? null,
        tcId: step.tc ?? null,
        interfaceId: step.iface ?? null,
        operationId: step.operation ?? null,
    }));
    if (editor.mode === 'initial') return updated;
    if (editor.mode === 'add') return [...relations.map(relationToDto), ...updated];
    if (updated.length !== 1) throw new Error('Ожидается один вызов');
    if (!relations.some((relation) => relation.id === editor.relationId)) {
        throw new Error('Вызов больше не существует');
    }
    return relations.map((relation) =>
        relation.id === editor.relationId
            ? { ...updated[0], id: relation.id }
            : relationToDto(relation),
    );
};

export const buildRelationsRemoval = (
    relations: IRelations[],
    relationId: number,
): IRelationForm[] => {
    if (!relations.some((relation) => relation.id === relationId)) {
        throw new Error('Вызов больше не существует');
    }
    return relations.filter((relation) => relation.id !== relationId).map(relationToDto);
};
