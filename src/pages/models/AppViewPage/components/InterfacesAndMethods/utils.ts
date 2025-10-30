import { IMapicInterfaceData, IStructurizrContainerData } from 'api/product/types';

export const containerFilterFunction = (
    containerData: IStructurizrContainerData[] | undefined,
    hideEmptyInterfaces: boolean,
    hideDeletedEntities: boolean,
) => {
    let res: IStructurizrContainerData[] = [];

    res = (containerData ?? []).filter((container) =>
        hideEmptyInterfaces ? container.interfaces.length !== 0 : true,
    );

    if (hideDeletedEntities) {
        res = res
            .filter((c) => !c.deletedDate)
            .map((c) => ({
                ...c,
                interfaces: c.interfaces
                    .filter((i) => !i.deletedDate)
                    .map((i) => ({ ...i, operations: i.operations.filter((o) => !o.deletedDate) })),
            }));
    }

    return res;
};

export const mapicFilterFunction = (
    mapicData: IMapicInterfaceData[] | undefined,
    hideEmptyInterfaces: boolean,
    hideDeletedEntities: boolean,
) => {
    let res: IMapicInterfaceData[] = [];

    res = (mapicData ?? []).filter((mapicInterface) =>
        hideEmptyInterfaces ? mapicInterface.operations.length !== 0 : true,
    );

    if (hideDeletedEntities) {
        res = res
            .filter((i) => !i.deletedDate)
            .map((i) => ({ ...i, operations: i.operations.filter((o) => !o.deletedDate) }));
    }

    return res;
};
