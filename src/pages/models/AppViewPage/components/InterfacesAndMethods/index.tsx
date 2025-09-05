import React, { FC, useState } from 'react';
import {
    ButtonGroup,
    Search,
    Skeleton,
    Table,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

import { Text } from 'components/core';

import {
    useGetProductMapicInterfacesByCmdbQuery,
    useGetProductStructurizrContainerByCmdbQuery,
    useGetProductStructurizrInterfacesByCmdbQuery,
} from 'api/queries/product';

import { MapicTableRow, StructurizrTableRow } from './components';
import { InterfaceOptions } from './const';
import { IInterfacesAndMethods } from './types';
import * as S from './units';

export const InterfacesAndMethods: FC<IInterfacesAndMethods> = ({ cmdb }) => {
    const [searchText, setSearchText] = useState('');
    const [interfaceOption, setInterfaceOption] = useState(InterfaceOptions.STRUCTURIZR);

    const { data: containerData, isLoading: isLoadingContainerData } =
        useGetProductStructurizrContainerByCmdbQuery(cmdb);
    const { data: structurizrData, isLoading: isLoadingStructurizrData } =
        useGetProductStructurizrInterfacesByCmdbQuery(cmdb);
    const { data: mapicData, isLoading: isLoadingMapicData } =
        useGetProductMapicInterfacesByCmdbQuery(cmdb);

    const containerDataFiltered = containerData?.filter((containerInterface) =>
        containerInterface.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    const mapicDataFiltered = mapicData?.filter((mapicInterface) =>
        mapicInterface.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    return (
        <S.Container>
            <S.SearchContainer>
                <Search
                    fullWidth
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onClear={() => setSearchText('')}
                    placeholder="Название интерфейса или метода"
                />
            </S.SearchContainer>

            <ButtonGroup
                alwaysSelected
                selectedOption={{ id: interfaceOption }}
                size="small"
                options={[
                    {
                        id: InterfaceOptions.STRUCTURIZR,
                        label: 'Structurizr',
                    },
                    {
                        id: InterfaceOptions.MAPIC,
                        label: 'Mapic',
                    },
                ]}
                onChange={(option) => {
                    setSearchText('');
                    setInterfaceOption(option.id as InterfaceOptions);
                }}
            />

            {interfaceOption === InterfaceOptions.STRUCTURIZR && (
                <>
                    {isLoadingContainerData && <Skeleton height={300} />}
                    {containerDataFiltered && containerDataFiltered.length !== 0 && (
                        <Table>
                            {containerDataFiltered.map((container, i) => (
                                <StructurizrTableRow key={i} container={container} />
                            ))}
                        </Table>
                    )}
                    {containerDataFiltered?.length === 0 && (
                        <S.EmptyContainer>
                            <Text inactive variant="body2">
                                Не найдено
                            </Text>
                        </S.EmptyContainer>
                    )}
                </>
            )}

            {interfaceOption === InterfaceOptions.MAPIC && (
                <>
                    {(isLoadingMapicData || isLoadingStructurizrData) && <Skeleton height={300} />}
                    {mapicDataFiltered && mapicDataFiltered.length !== 0 && structurizrData && (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Интерфейс mapic</TableHeaderData>
                                    <TableHeaderData>Контекст api</TableHeaderData>
                                    <TableHeaderData>Контекст провайдера</TableHeaderData>
                                    <TableHeaderData>Интерфейс AaAC</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mapicDataFiltered.map((mapicInterface, i) => (
                                    <MapicTableRow
                                        key={i}
                                        mapicInterface={mapicInterface}
                                        sctructurizrInterfaces={structurizrData}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    {mapicDataFiltered?.length === 0 && (
                        <S.EmptyContainer>
                            <Text inactive variant="body2">
                                Не найдено
                            </Text>
                        </S.EmptyContainer>
                    )}
                </>
            )}
        </S.Container>
    );
};
