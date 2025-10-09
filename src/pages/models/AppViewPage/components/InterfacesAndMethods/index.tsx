import React, { FC, useState } from 'react';

import {
    useGetProductMapicInterfacesByCmdbQuery,
    useGetProductStructurizrContainerByCmdbQuery,
    useGetProductStructurizrInterfacesByCmdbQuery,
} from 'api/queries/product';

import { MapicTable, StructurizrTable } from './components';
import { InterfaceOptions } from './const';
import { IInterfacesAndMethods } from './types';
import * as S from './units';
import { containerFilterFunction, mapicFilterFunction } from './utils';

export const InterfacesAndMethods: FC<IInterfacesAndMethods> = ({ cmdb }) => {
    const [hideEmptyInterfaces, setHideEmptyInterfaces] = useState(false);
    const [interfaceOption, setInterfaceOption] = useState(InterfaceOptions.STRUCTURIZR);

    const { data: containerData, isLoading: isLoadingContainerData } =
        useGetProductStructurizrContainerByCmdbQuery(cmdb);
    const { data: structurizrData, isLoading: isLoadingStructurizrData } =
        useGetProductStructurizrInterfacesByCmdbQuery(cmdb);
    const { data: mapicData, isLoading: isLoadingMapicData } =
        useGetProductMapicInterfacesByCmdbQuery(cmdb);

    const hasEmptyInterfaces = (containerData ?? []).some(
        (container) => container.interfaces.length === 0,
    );

    const hasEmptyOperations = (mapicData ?? []).some(
        (mapicInterface) => mapicInterface.operations.length === 0,
    );

    const containerDataFiltered = containerFilterFunction(containerData, hideEmptyInterfaces);

    const mapicDataFiltered = mapicFilterFunction(mapicData, hideEmptyInterfaces);

    const switchDisabled =
        (interfaceOption === InterfaceOptions.STRUCTURIZR && !hasEmptyInterfaces) ||
        (interfaceOption === InterfaceOptions.MAPIC && !hasEmptyOperations);

    const lastMapicUpdateDate = (mapicData ?? [])
        .reduce((acc, v) => [...acc, v.createDate, v.updateDate], [] as (string | null)[])
        .filter((v) => v !== null)
        .sort((a, b) => (b as string).localeCompare(a as string))[0];

    return (
        <S.Container>
            {interfaceOption === InterfaceOptions.STRUCTURIZR && (
                <StructurizrTable
                    hideEmptyInterfaces={hideEmptyInterfaces}
                    setHideEmptyInterfaces={setHideEmptyInterfaces}
                    interfaceOption={interfaceOption}
                    setInterfaceOption={setInterfaceOption}
                    switchDisabled={switchDisabled}
                    containerData={containerDataFiltered}
                    isLoadingContainerData={isLoadingContainerData}
                />
            )}

            {interfaceOption === InterfaceOptions.MAPIC && (
                <MapicTable
                    hideEmptyInterfaces={hideEmptyInterfaces}
                    setHideEmptyInterfaces={setHideEmptyInterfaces}
                    interfaceOption={interfaceOption}
                    setInterfaceOption={setInterfaceOption}
                    switchDisabled={switchDisabled}
                    isLoadingMapicData={isLoadingMapicData}
                    isLoadingStructurizrData={isLoadingStructurizrData}
                    mapicData={mapicDataFiltered}
                    structurizrData={structurizrData ?? []}
                    lastMapicUpdateDate={lastMapicUpdateDate}
                />
            )}
        </S.Container>
    );
};
