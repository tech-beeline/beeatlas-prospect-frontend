import { type Option } from 'components/ui';

import { IStructurizrContainerData } from 'api/product/types';
import { IProjectUsecasePipelineConnectionOperation } from 'api/staging-service/types';

const matchesSearch = (value: string, search: string) =>
    value.toLocaleLowerCase('ru').includes(search.trim().toLocaleLowerCase('ru'));

const getActiveMethods = (containers: IStructurizrContainerData[]) =>
    containers
        .filter(({ deletedDate }) => !deletedDate)
        .flatMap((container) =>
            container.interfaces
                .filter(({ deletedDate }) => !deletedDate)
                .flatMap((item) =>
                    item.operations
                        .filter(({ deletedDate }) => !deletedDate)
                        .map((operation) => ({ container, item, operation })),
                ),
        );

export const getMethodOptions = (
    containers: IStructurizrContainerData[],
    search: string,
): Option<string>[] =>
    getActiveMethods(containers)
        .map(({ container, item, operation }) => ({
            id: operation.id,
            value: `${operation.type} ${operation.name} — ${container.name} / ${item.name}`,
        }))
        .filter((option) => matchesSearch(option.value, search));

export const findConnectionOperation = (
    containers: IStructurizrContainerData[],
    operationId: number,
    productAlias: string,
): IProjectUsecasePipelineConnectionOperation | null => {
    const method = getActiveMethods(containers).find(
        ({ operation }) => operation.id === operationId,
    );
    if (!method) return null;

    return {
        id: method.operation.id,
        interfaceId: method.item.id,
        operationType: method.operation.type,
        operationName: method.operation.name,
        interfaceCode: method.item.code ?? '',
        containerCode: method.container.code,
        productAlias,
    };
};
