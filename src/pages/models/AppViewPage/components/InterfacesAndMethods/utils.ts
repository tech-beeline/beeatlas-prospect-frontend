import { IMapicInterfaceData, IStructurizrContainerData } from 'api/product/types';

export const containerFilterFunction = (
    containerData: IStructurizrContainerData[] | undefined,
    hideEmptyInterfaces: boolean,
) =>
    (containerData ?? []).filter((container) =>
        hideEmptyInterfaces ? container.interfaces.length !== 0 : true,
    );

export const mapicFilterFunction = (
    mapicData: IMapicInterfaceData[] | undefined,
    hideEmptyInterfaces: boolean,
) =>
    (mapicData ?? []).filter((mapicInterface) =>
        hideEmptyInterfaces ? mapicInterface.operations.length !== 0 : true,
    );
