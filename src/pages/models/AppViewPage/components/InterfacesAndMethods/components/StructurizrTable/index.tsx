import React, { FC, useState } from 'react';
import {
    Autocomplete,
    Button,
    ButtonGroup,
    Select,
    Skeleton,
    Table,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { has } from 'lodash';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { IStructurizrContainerInterfaceData, IStructurizrOperation } from 'api/product/types';
import { useGetProductStructurizrContainerByCmdbQuery } from 'api/queries/product';

import { FILTER_OPTIONS, FilterOptions, InterfaceOptions } from '../../const';
import { containerFilterFunction } from '../../utils';

import { StructurizrTableRow } from './components';
import { EntityTypes, ISelectedEntity, IStructurizrTable } from './types';
import * as S from './units';

export const StructurizrTable: FC<IStructurizrTable> = ({
    interfaceOption,
    setInterfaceOption,
    cmdb,
}) => {
    const [filterOptions, setFilterOptions] = useState(FILTER_OPTIONS);

    const { data: containerData, isLoading: isLoadingContainerData } =
        useGetProductStructurizrContainerByCmdbQuery(cmdb);

    const containerDataFiltered = containerFilterFunction(
        containerData,
        filterOptions.some((o) => o.id === FilterOptions.EMPTY),
        filterOptions.some((o) => o.id === FilterOptions.DELETED),
    );

    const [searchText, setSearchText] = useState('');

    const structurizrInterfaces = containerDataFiltered.reduce(
        (acc, v) => [...acc, ...v.interfaces.map((v) => ({ ...v, containerId: v.id }))],
        [] as IStructurizrContainerInterfaceData[],
    );

    const structurizrSearchVariants = structurizrInterfaces
        .reduce((acc, v) => [...acc, ...v.operations.map((o) => ({ ...o, interfaceId: v.id }))], [
            ...structurizrInterfaces,
        ] as (IStructurizrContainerInterfaceData | IStructurizrOperation)[])
        .filter((v) =>
            (has(v, 'type') ? `${(v as { type: string }).type} ${v.name}` : v.name)
                .toLowerCase()
                .includes(searchText.toLowerCase()),
        )
        .map((o) => ({
            id: o.id,
            value: has(o, 'type') ? `${(o as { type: string }).type} ${o.name}` : o.name,
            type: has(o, 'protocol') ? EntityTypes.INTERFACE : EntityTypes.OPERATION,
            interfaceId: has(o, 'protocol')
                ? null
                : (o as unknown as { interfaceId: number }).interfaceId,
        }));

    const [selectedEntity, setSelectedEntity] = useState<ISelectedEntity | null>(null);

    return (
        <>
            <S.ActionsContainer>
                <S.SearchContainer>
                    <Autocomplete
                        fullWidth
                        placeholder="Название интерфейса или метода"
                        options={structurizrSearchVariants}
                        renderValue={(v) => v.value}
                        type="search"
                        value={selectedEntity}
                        onChange={(value) => {
                            setSelectedEntity(value as unknown as ISelectedEntity);
                            setSearchText(value.value);
                        }}
                        onInputChange={(v) => {
                            setSelectedEntity(null);
                            setSearchText(v);
                        }}
                        onInputClear={() => {
                            setSelectedEntity(null);
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
                        values={filterOptions}
                        onChange={(v) => setFilterOptions(v)}
                    />
                </S.SelectContainer>
                <Button
                    variant="plain"
                    disabled={filterOptions.length === 0}
                    size="medium"
                    onClick={() => {
                        setFilterOptions([]);
                    }}
                >
                    Сбросить
                </Button>
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

            {isLoadingContainerData && <Skeleton height={300} />}
            {containerDataFiltered && containerDataFiltered.length !== 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataMaxWidth>Контейнер</S.TableHeaderDataMaxWidth>
                            <TableHeaderData>Код</TableHeaderData>
                            <TableHeaderData>Дата&#8209;изменения</TableHeaderData>
                            <TableHeaderData>Кол&#8209;во&nbsp;интерфейсов</TableHeaderData>
                            <TableHeaderData>
                                Кол&#8209;во&nbsp;методов&nbsp;в&nbsp;интерфейсах
                            </TableHeaderData>
                            <TableHeaderData>Статус</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    {containerDataFiltered.map((container) => (
                        <StructurizrTableRow
                            key={container.id}
                            container={container}
                            selectedEntity={selectedEntity}
                        />
                    ))}
                </Table>
            )}
            {!isLoadingContainerData && containerDataFiltered.length === 0 && (
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
