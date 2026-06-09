import React, { FC, useEffect, useRef, useState } from 'react';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import {
    Label,
    Progress,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { useCreateConnectionInterfaceMutation } from 'api/queries/product';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { IMapicTableRow } from './types';
import * as S from './units';

export const MapicTableRow: FC<IMapicTableRow> = ({
    mapicInterface,
    sctructurizrInterfaces,
    selectedMapicOperation,
}) => {
    const rowRef = useRef<HTMLDivElement | null>(null);
    const [expanded, setExpanded] = useState(false);

    const [search, setSearch] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const { mutateAsync: createConncetionInterface, isPending } =
        useCreateConnectionInterfaceMutation();

    const handleDropdownItemClick = async (
        mapicInterfaceId: number,
        structurizrInterfaceId: number | null,
    ) => {
        await createConncetionInterface({
            mapicInterfaceId,
            archInterfaceId: structurizrInterfaceId,
        });
    };

    const sctructurizrInterfacesFiltered = sctructurizrInterfaces.filter((int) =>
        int.name.toLowerCase().includes(search.toLowerCase()),
    );

    const disabled = mapicInterface.operations.length === 0;

    useEffect(() => {
        if (
            selectedMapicOperation &&
            mapicInterface.operations.map((o) => o.id).includes(Number(selectedMapicOperation.id))
        ) {
            setExpanded(true);
            rowRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedMapicOperation]);

    const mapicOperationsFiltered =
        selectedMapicOperation && selectedMapicOperation.interfaceId === mapicInterface.id
            ? mapicInterface.operations.filter((o) => o.id === selectedMapicOperation.id)
            : mapicInterface.operations;

    const hasMapping = !!mapicInterface.connectInterface.name;

    return (
        <>
            <div ref={rowRef} />
            <S.TableRowStyled disabled={disabled} expanded={expanded} hasNoMapping={!hasMapping}>
                <TableData>
                    <S.NameContainer>
                        <S.IconButtonContainer>
                            {!disabled && (
                                <IconButton
                                    iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                                    onClick={() => setExpanded(!expanded)}
                                    size="medium"
                                />
                            )}
                        </S.IconButtonContainer>
                        <Text inactive={disabled} variant="body3">
                            {mapicInterface.name}
                        </Text>
                    </S.NameContainer>
                </TableData>
                <TableData>
                    <Text inactive={disabled} variant="body3">
                        {mapicInterface.context}
                    </Text>
                </TableData>
                <TableData>
                    <Text inactive={disabled} variant="body3">
                        {formatNullableString(mapicInterface.contextProvider)}
                    </Text>
                </TableData>
                {isEditing && (
                    <S.TableDataInput>
                        <S.RelativeContainer>
                            <S.InputStyled
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onBlur={() => {
                                    setIsEditing(false);
                                    setSearch('');
                                }}
                            />
                            <S.Dropdown>
                                {search.length === 0 && (
                                    <S.DropdownItem
                                        onMouseDown={() =>
                                            handleDropdownItemClick(mapicInterface.id, null)
                                        }
                                    >
                                        {formatNullableString(null)}
                                    </S.DropdownItem>
                                )}
                                {sctructurizrInterfacesFiltered.map((structurizrInterface) => (
                                    <S.DropdownItem
                                        key={structurizrInterface.id}
                                        onMouseDown={() =>
                                            handleDropdownItemClick(
                                                mapicInterface.id,
                                                structurizrInterface.id,
                                            )
                                        }
                                    >
                                        {structurizrInterface.name}
                                    </S.DropdownItem>
                                ))}
                                {sctructurizrInterfacesFiltered.length === 0 && (
                                    <S.DropdownItem>
                                        <Text inactive variant="body2">
                                            Не найдено
                                        </Text>
                                    </S.DropdownItem>
                                )}
                            </S.Dropdown>
                        </S.RelativeContainer>
                    </S.TableDataInput>
                )}
                {!isEditing && (
                    <S.TableDataHovered onClick={() => setIsEditing(true)}>
                        <S.ConnectInterfaceContainer>
                            <Text inactive={disabled || !hasMapping} variant="body3">
                                {formatNullableString(
                                    mapicInterface.connectInterface.name,
                                    'нет соответствия',
                                )}
                            </Text>
                            <IconButton iconName={Icons.Edit} size="medium" />
                        </S.ConnectInterfaceContainer>
                    </S.TableDataHovered>
                )}
                <TableData alignRight>
                    <Text inactive={disabled} variant="body3">
                        {mapicInterface?.operations.length}/
                        {
                            mapicInterface?.operations.filter(
                                (operation) => !!operation.connectOperation,
                            ).length
                        }
                    </Text>
                </TableData>
                <TableData>
                    <Label
                        title={mapicInterface.deletedDate ? 'Удален' : 'Активен'}
                        type={mapicInterface.deletedDate ? 'error' : 'success'}
                    />
                </TableData>
            </S.TableRowStyled>
            {isPending && (
                <TableRow>
                    <S.ProgressContainer colSpan={5}>
                        <Progress cycled shape="linear" />
                    </S.ProgressContainer>
                </TableRow>
            )}
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={6}>
                        <S.TableContainer>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderData>Метод mapic</TableHeaderData>
                                        <TableHeaderData>Метод structurizr</TableHeaderData>
                                        <TableHeaderData>Статус</TableHeaderData>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mapicOperationsFiltered.map((operation, i) => (
                                        <S.OperationRowStyled
                                            key={i}
                                            hasNoMapping={!operation.connectOperation}
                                        >
                                            <TableData>{`${operation.type} ${operation.name}`}</TableData>
                                            <TableData>
                                                {operation.connectOperation ? (
                                                    `${operation.connectOperation.type} ${operation.connectOperation.name}`
                                                ) : (
                                                    <Text variant="body3" inactive>
                                                        нет соответствия
                                                    </Text>
                                                )}
                                            </TableData>
                                            <TableData>
                                                <Label
                                                    title={
                                                        operation.deletedDate ? 'Удален' : 'Активен'
                                                    }
                                                    type={
                                                        operation.deletedDate ? 'error' : 'success'
                                                    }
                                                />
                                            </TableData>
                                        </S.OperationRowStyled>
                                    ))}
                                </TableBody>
                            </S.TableStyled>
                        </S.TableContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
