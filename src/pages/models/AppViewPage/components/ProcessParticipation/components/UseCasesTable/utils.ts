import { IMapicInterfaceData, IMapicInterfaceOperationData } from 'api/product/types';
import { IUsecaseOperationsGroup } from 'api/usecase/types';
import * as R from 'router/const';

import { IParticipationRow } from '../../types';

import { UsecaseMethodStatus } from './types';

export const getUsecaseOperations = (interfaces: IMapicInterfaceData[]) =>
    new Map(
        interfaces
            .flatMap((item) => item.operations)
            .filter((operation) => !operation.deletedDate)
            .map((operation) => [operation.id, operation]),
    );

export const buildUsecaseRows = (
    groups: IUsecaseOperationsGroup[],
    operations: Map<number, IMapicInterfaceOperationData>,
): IParticipationRow<IMapicInterfaceOperationData>[] =>
    groups.map((group) => ({
        key: String(group.id),
        title: group.name,
        code: group.code,
        url: `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}?id=${group.id}`,
        methods: group.operationIds.flatMap((id) => {
            const operation = operations.get(id);
            return operation ? [operation] : [];
        }),
    }));

export const formatUsecaseMethod = (operation: IMapicInterfaceOperationData) =>
    [operation.type, operation.name].filter(Boolean).join(' ');

export const getUsecaseMethodStatus = (operation: IMapicInterfaceOperationData) => {
    const connected = Boolean(operation.connectOperation);
    if (connected && operation.isPlanned) return UsecaseMethodStatus.REVIEW;
    if (connected) return UsecaseMethodStatus.IMPLEMENTED;
    if (operation.isPlanned) return UsecaseMethodStatus.PLANNED;
    return UsecaseMethodStatus.NOT_MAPPED;
};

export const getUsecaseMethodSearchValues = (operation: IMapicInterfaceOperationData) => [
    formatUsecaseMethod(operation),
    operation.description,
    operation.techCapability?.name,
    operation.techCapability?.code,
];
