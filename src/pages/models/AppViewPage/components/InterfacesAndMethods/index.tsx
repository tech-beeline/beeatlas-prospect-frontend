import React, { FC, useState } from 'react';
import {
    ButtonGroup,
    Search,
    Skeleton,
    Switch,
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

    const containerDataFiltered = containerData
        ?.filter((containerInterface) =>
            hideEmptyInterfaces ? containerInterface.interfaces.length !== 0 : true,
        )
        .filter((containerInterface) =>
            containerInterface.name.toLowerCase().includes(searchText.toLowerCase()),
        );

    const mapicDataFiltered = mapicData
        ?.filter((mapicInterface) =>
            hideEmptyInterfaces ? mapicInterface.operations.length !== 0 : true,
        )
        .filter((mapicInterface) =>
            mapicInterface.name.toLowerCase().includes(searchText.toLowerCase()),
        );

    return (
        <S.Container>
            <S.ActionsContainer>
                <S.SearchContainer>
                    <Search
                        fullWidth
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onClear={() => setSearchText('')}
                        placeholder="Название интерфейса или метода"
                    />
                </S.SearchContainer>
                <Switch
                    disabled={
                        (interfaceOption === InterfaceOptions.STRUCTURIZR && !hasEmptyInterfaces) ||
                        (interfaceOption === InterfaceOptions.MAPIC && !hasEmptyOperations)
                    }
                    label="Скрыть пустые интерфейсы"
                    checked={hideEmptyInterfaces}
                    onChange={(e) => setHideEmptyInterfaces(e.target.checked)}
                />
            </S.ActionsContainer>

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
                            <TableHead>
                                <TableRow>
                                    <S.TableHeaderDataMaxWidth>Контейнер</S.TableHeaderDataMaxWidth>
                                    <TableHeaderData>Кол&#8209;во&nbsp;интерфейсов</TableHeaderData>
                                    <TableHeaderData>
                                        Кол&#8209;во&nbsp;методов&nbsp;в&nbsp;интерфейсах
                                    </TableHeaderData>
                                </TableRow>
                            </TableHead>
                            {containerDataFiltered.map((container) => (
                                <StructurizrTableRow key={container.id} container={container} />
                            ))}
                        </Table>
                    )}
                    {!isLoadingContainerData && containerDataFiltered?.length === 0 && (
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
                                    <TableHeaderData>Интерфейс structurizr</TableHeaderData>
                                    <TableHeaderData alignRight>
                                        Методы (всего/сопоставленные)
                                    </TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mapicDataFiltered.map((mapicInterface) => (
                                    <MapicTableRow
                                        key={mapicInterface.id}
                                        mapicInterface={mapicInterface}
                                        sctructurizrInterfaces={structurizrData}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    {!(isLoadingMapicData || isLoadingStructurizrData) &&
                        mapicDataFiltered?.length === 0 && (
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
