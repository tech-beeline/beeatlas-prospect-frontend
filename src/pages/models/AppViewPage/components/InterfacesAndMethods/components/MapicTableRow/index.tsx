import React, { FC, useState } from 'react';
import {
    IconButton,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { useCreateConnectionInterfaceMutation } from 'api/queries/product';
import { formatNullableString } from 'utils/formatters';

import { IMapicTableRow } from './types';
import * as S from './units';

export const MapicTableRow: FC<IMapicTableRow> = ({ mapicInterface, sctructurizrInterfaces }) => {
    const [expanded, setExpanded] = useState(false);

    const [search, setSearch] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const { mutateAsync: createConncetionInterface } = useCreateConnectionInterfaceMutation();

    const handleDropdownItemClick = async (
        mapicInterfaceId: number,
        structurizrInterfaceId: number,
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

    return (
        <>
            <S.TableRowStyled disabled={disabled} expanded={expanded}>
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
                    <S.TableDataFullWidth>
                        <S.ConnectInterfaceContainer>
                            <Text inactive={disabled} variant="body3">
                                {formatNullableString(mapicInterface.connectInterface.name)}
                            </Text>
                            <IconButton
                                size="medium"
                                iconName={Icons.Edit}
                                onClick={() => setIsEditing(true)}
                            />
                        </S.ConnectInterfaceContainer>
                    </S.TableDataFullWidth>
                )}
                <TableData alignRight>
                    <Text inactive={disabled} variant="body3">
                        {mapicInterface.operations.length}/
                        {
                            mapicInterface.operations.filter(
                                (operation) => !!operation.connectOperation,
                            ).length
                        }
                    </Text>
                </TableData>
            </S.TableRowStyled>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={5} style={{ padding: 0 }}>
                        <S.TableContainer>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderData>Метод mapic</TableHeaderData>
                                        <TableHeaderData>Метод structurizr</TableHeaderData>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mapicInterface.operations.map((operation, i) => (
                                        <TableRow key={i}>
                                            <TableData>{`${operation.type} ${operation.name}`}</TableData>
                                            <TableData>
                                                {formatNullableString(
                                                    operation.connectOperation?.name,
                                                )}
                                            </TableData>
                                        </TableRow>
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
