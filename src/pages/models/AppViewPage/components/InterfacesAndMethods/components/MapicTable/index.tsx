import React, { FC, useState } from 'react';
import {
    Autocomplete,
    ButtonGroup,
    Skeleton,
    Switch,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import dayjs from 'dayjs';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { IMapicInterfaceOperationData } from 'api/product/types';

import { InterfaceOptions } from '../../const';

import { MapicTableRow } from './components';
import { IMapicTable, ISelectedMapicOperation } from './types';
import * as S from './units';

export const MapicTable: FC<IMapicTable> = ({
    hideEmptyInterfaces,
    setHideEmptyInterfaces,
    interfaceOption,
    setInterfaceOption,
    mapicData,
    structurizrData,
    switchDisabled,
    isLoadingMapicData,
    isLoadingStructurizrData,
    lastMapicUpdateDate,
}) => {
    const [searchText, setSearchText] = useState('');

    const mapicSearchVariants = mapicData
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
                    <Autocomplete
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
                    />
                </S.SearchContainer>
                <Switch
                    disabled={switchDisabled}
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

            {(isLoadingMapicData || isLoadingStructurizrData) && <Skeleton height={300} />}
            {mapicData && mapicData.length !== 0 && structurizrData && (
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mapicData.map((mapicInterface) => (
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
            {!(isLoadingMapicData || isLoadingStructurizrData) && mapicData.length === 0 && (
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
