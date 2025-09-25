import {
    IMapicInterfaceData,
    IStructurizrContainerData,
    IStructurizrContainerInterfaceData,
    // IStructurizrOperation,
} from 'api/product/types';

export const containerFilterFunction = (
    containerData: IStructurizrContainerData[] | undefined,
    searchText: string,
    hideEmptyInterfaces: boolean,
): IStructurizrContainerData[] => {
    const filteredContainers = (containerData ?? []).filter((container) =>
        hideEmptyInterfaces ? container.interfaces.length !== 0 : true,
    );

    const resultContainers: IStructurizrContainerData[] = [];

    for (const container of filteredContainers) {
        const resultInterfaces: IStructurizrContainerInterfaceData[] = [];

        for (const containerInterface of container.interfaces) {
            const filteredOperations = containerInterface.operations.filter((operation) =>
                operation.name.toLowerCase().includes(searchText.toLowerCase()),
            );

            if (
                filteredOperations.length > 0 ||
                containerInterface.name.toLowerCase().includes(searchText.toLowerCase())
            ) {
                resultInterfaces.push({ ...containerInterface, operations: filteredOperations });
            }
        }

        if (
            resultInterfaces.length > 0 ||
            container.name.toLowerCase().includes(searchText.toLowerCase())
        ) {
            resultContainers.push({ ...container, interfaces: resultInterfaces });
        }
    }

    return resultContainers;
};

export const mapicFilterFunction = (
    mapicData: IMapicInterfaceData[] | undefined,
    searchText: string,
    hideEmptyInterfaces: boolean,
): IMapicInterfaceData[] => {
    const filteredData = (mapicData ?? []).filter((mapicInterface) =>
        hideEmptyInterfaces ? mapicInterface.operations.length !== 0 : true,
    );

    const resultData: IMapicInterfaceData[] = [];

    for (const mapicInterface of filteredData ?? []) {
        const filteredOperations = mapicInterface.operations.filter((operation) =>
            operation.name.toLowerCase().includes(searchText.toLowerCase()),
        );

        if (
            filteredOperations.length > 0 ||
            mapicInterface.name.toLowerCase().includes(searchText.toLowerCase())
        ) {
            resultData.push({ ...mapicInterface, operations: filteredOperations });
        }
    }

    return resultData;
};
