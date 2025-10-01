import React, { FC, useState } from 'react';
import {
    Autocomplete,
    ButtonGroup,
    Skeleton,
    Switch,
    Table,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { has } from 'lodash';

import { Text } from 'components/core';

import { IStructurizrContainerInterfaceData, IStructurizrOperation } from 'api/product/types';

import { InterfaceOptions } from '../../const';

import { StructurizrTableRow } from './components';
import { EntityTypes, ISelectedEntity, IStructurizrTable } from './types';
import * as S from './units';

export const StructurizrTable: FC<IStructurizrTable> = ({
    hideEmptyInterfaces,
    setHideEmptyInterfaces,
    interfaceOption,
    setInterfaceOption,
    switchDisabled,
    containerData,
    isLoadingContainerData,
}) => {
    const [searchText, setSearchText] = useState('');

    const structurizrInterfaces = containerData.reduce(
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

            {isLoadingContainerData && <Skeleton height={300} />}
            {containerData && containerData.length !== 0 && (
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
                        </TableRow>
                    </TableHead>
                    {containerData.map((container) => (
                        <StructurizrTableRow
                            key={container.id}
                            container={container}
                            selectedEntity={selectedEntity}
                        />
                    ))}
                </Table>
            )}
            {!isLoadingContainerData && containerData.length === 0 && (
                <S.EmptyContainer>
                    <Text inactive variant="body2">
                        Не найдено
                    </Text>
                </S.EmptyContainer>
            )}
        </>
    );
};
