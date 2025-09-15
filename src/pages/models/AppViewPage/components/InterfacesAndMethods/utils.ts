import {
    IMapicInterfaceData,
    IStructurizrContainerData,
    IStructurizrOperation,
} from 'api/product/types';

export const containerFilterFunction = (
    containerData: IStructurizrContainerData[] | undefined,
    searchText: string,
    hideEmptyInterfaces: boolean,
) =>
    containerData
        ?.filter((container) => (hideEmptyInterfaces ? container.interfaces.length !== 0 : true))
        .filter((containerInterface) => {
            if (containerInterface.name.toLowerCase().includes(searchText.toLowerCase())) {
                return true;
            }
            if (
                containerInterface.interfaces.some((containerInterface) =>
                    containerInterface.name.toLowerCase().includes(searchText.toLowerCase()),
                )
            ) {
                return true;
            }
            const containerMethods = containerInterface.interfaces.reduce(
                (acc, containerInterface) => [...acc, ...containerInterface.operations],
                [] as IStructurizrOperation[],
            );
            return containerMethods.some((method) =>
                method.name.toLowerCase().includes(searchText.toLowerCase()),
            );
        });

export const mapicFilterFunction = (
    mapicData: IMapicInterfaceData[] | undefined,
    searchText: string,
    hideEmptyInterfaces: boolean,
) =>
    mapicData
        ?.filter((mapicInterface) =>
            hideEmptyInterfaces ? mapicInterface.operations.length !== 0 : true,
        )
        .filter(
            (mapicInterface) =>
                mapicInterface.name.toLowerCase().includes(searchText.toLowerCase()) ||
                mapicInterface.operations.some((operation) =>
                    operation.name.toLowerCase().includes(searchText.toLowerCase()),
                ),
        );
