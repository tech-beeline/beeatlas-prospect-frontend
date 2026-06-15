import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { AutocompleteControlled } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Select } from 'components/ui';
import {
    Button,
    ButtonGroup,
    Skeleton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { IMapicInterfaceOperationData } from 'api/product/types';
import {
    useGetProductMapicInterfacesByCmdbQuery,
    useGetProductStructurizrInterfacesByCmdbQuery,
} from 'api/queries/product';

import { FILTER_OPTIONS, FilterOptions, InterfaceOptions } from '../../const';
import { mapicFilterFunction } from '../../utils';

import { MapicTableRow } from './components';
import { IMapicTable, ISelectedMapicOperation } from './types';
import * as S from './units';

export const MapicTable: FC<IMapicTable> = ({ interfaceOption, cmdb }) => {
    const [params, setSearchParams] = useSearchParams();

    const [hideEmpty, setHideEmpty] = useState(true);
    const [hideDeleted, setHideDeleted] = useState(true);
    const hideEmptyParam = params.get('hideEmpty');
    const hideDeletedParam = params.get('hideDeleted');

    useEffect(() => {
        if (hideEmptyParam === 'false') {
            setHideEmpty(false);
        } else {
            setHideEmpty(true);
        }
        if (hideDeletedParam === 'false') {
            setHideDeleted(false);
        } else {
            setHideDeleted(true);
        }
    }, [hideEmptyParam, hideDeletedParam]);

    const { data: structurizrData, isLoading: isLoadingStructurizrData } =
        useGetProductStructurizrInterfacesByCmdbQuery(cmdb);
    const { data: mapicData, isLoading: isLoadingMapicData } =
        useGetProductMapicInterfacesByCmdbQuery(cmdb);

    const mapicDataFiltered = mapicFilterFunction(mapicData, hideEmpty, hideDeleted);

    const lastMapicUpdateDate = (mapicData ?? [])
        .reduce((acc, v) => [...acc, v.createDate, v.updateDate], [] as (string | null)[])
        .filter((v) => v !== null)
        .sort((a, b) => (b as string).localeCompare(a as string))[0];

    const [searchText, setSearchText] = useState('');

    const mapicSearchVariants = mapicDataFiltered
        .reduce(
            (acc, v) => [...acc, ...v.operations.map((o) => ({ ...o, interfaceId: v.id }))],
            [] as (IMapicInterfaceOperationData & { interfaceId: number })[],
        )
        .filter((o) => `${o.type} ${o.name}`.toLowerCase().includes(searchText.toLowerCase()))
        .map((o) => ({ id: o.id, value: `${o.type} ${o.name}`, interfaceId: o.interfaceId }));

    const [selectedMapicOperation, setSelectedMapicOperation] =
        useState<ISelectedMapicOperation | null>(null);

    return (
        <>
            <S.ActionsContainer>
                <S.SearchContainer>
                    {/* <Autocomplete
                        fullWidth
                        placeholder="Название интерфейса или метода"
                        options={mapicSearchVariants}
                        renderValue={(v) => v.value}
                        type="search"
                        value={selectedMapicOperation}
                        onChange={(value) => {
                            setSearchText(value.value);
                            setSelectedMapicOperation(value as unknown as ISelectedMapicOperation);
                        }}
                        onInputChange={(v) => {
                            setSelectedMapicOperation(null);
                            setSearchText(v);
                        }}
                        onInputClear={() => {
                            setSelectedMapicOperation(null);
                            setSearchText('');
                        }}
                    /> */}
                    <AutocompleteControlled
                        options={mapicSearchVariants}
                        searchText={searchText}
                        setSearchText={(v) => {
                            setSelectedMapicOperation(null);
                            setSearchText(v);
                        }}
                        placeholder="Название интерфейса или метода"
                        onChange={(value) => {
                            setSelectedMapicOperation(value);
                            setSearchText(value.value);
                        }}
                        onClear={() => {
                            setSelectedMapicOperation(null);
                            setSearchText('');
                        }}
                    />
                </S.SearchContainer>
                <S.SelectContainer>
                    <Select
                        multiple
                        fullWidth
                        label="Скрыть"
                        options={FILTER_OPTIONS}
                        makeOption={(o) => <S.SelectOption>{o.value}</S.SelectOption>}
                        values={FILTER_OPTIONS.filter(
                            (o) =>
                                (o.id === FilterOptions.DELETED && hideDeleted) ||
                                (o.id === FilterOptions.EMPTY && hideEmpty),
                        )}
                        onChange={(values) => {
                            const newParams = new URLSearchParams(Object.fromEntries(params));
                            newParams.delete('hideEmpty');
                            newParams.delete('hideDeleted');
                            const valueIds = values.map((v) => v.id);
                            if (valueIds.includes(FilterOptions.EMPTY)) {
                                newParams.append('hideEmpty', 'true');
                            } else {
                                newParams.append('hideEmpty', 'false');
                            }
                            if (valueIds.includes(FilterOptions.DELETED)) {
                                newParams.append('hideDeleted', 'true');
                            } else {
                                newParams.append('hideDeleted', 'false');
                            }
                            setSearchParams(newParams);
                        }}
                    />
                </S.SelectContainer>
                <Button
                    variant="plain"
                    disabled={!selectedMapicOperation && hideEmpty && hideDeleted}
                    size="medium"
                    onClick={() => {
                        const newParams = new URLSearchParams(Object.fromEntries(params));
                        newParams.set('hideEmpty', 'true');
                        newParams.set('hideDeleted', 'true');
                        newParams.delete('id');
                        newParams.delete('type');
                        setSearchParams(newParams);
                        setSearchText('');
                        setSelectedMapicOperation(null);
                    }}
                >
                    Сбросить
                </Button>
            </S.ActionsContainer>

            {!window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND && (
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
                        setSearchText('');
                        setSearchParams(
                            new URLSearchParams({
                                ...Object.fromEntries(params),
                                subtab: option.id ?? '',
                            }),
                        );
                    }}
                />
            )}

            {(isLoadingMapicData || isLoadingStructurizrData) && <Skeleton height={300} />}
            {mapicDataFiltered && mapicDataFiltered.length !== 0 && structurizrData && (
                <Table>
                    <TableHead>
                        {lastMapicUpdateDate && (
                            <TableRow>
                                <TableData colSpan={5}>
                                    Обновление по итогам публикации от{' '}
                                    {dayjs
                                        .utc(lastMapicUpdateDate)
                                        .local()
                                        .format('DD.MM.YYYY, HH:mm')}
                                </TableData>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableHeaderData>Интерфейс mapic</TableHeaderData>
                            <TableHeaderData>Контекст api</TableHeaderData>
                            <TableHeaderData>Контекст провайдера</TableHeaderData>
                            <TableHeaderData>Интерфейс structurizr</TableHeaderData>
                            <TableHeaderData alignRight>
                                Методы (всего/сопоставленные)
                            </TableHeaderData>
                            <TableHeaderData>Статус</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mapicDataFiltered.map((mapicInterface) => (
                            <MapicTableRow
                                key={mapicInterface.id}
                                mapicInterface={mapicInterface}
                                sctructurizrInterfaces={structurizrData}
                                selectedMapicOperation={selectedMapicOperation}
                            />
                        ))}
                    </TableBody>
                </Table>
            )}
            {!(isLoadingMapicData || isLoadingStructurizrData) && mapicDataFiltered.length === 0 && (
                <S.EmptyContainer>
                    <NotFoundBlock
                        title="Интерфейсы, методы и SLA нет"
                        imageVariant={ImageVariants.EMPTY_BOX}
                        text=""
                    />
                </S.EmptyContainer>
            )}
        </>
    );
};
