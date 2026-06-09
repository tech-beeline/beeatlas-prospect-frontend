import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Label, TableData, TableRow } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { ServiceTableRow } from './components';
import { IStructurizrTableRow } from './types';
import * as S from './units';

export const StructurizrTableRow: FC<IStructurizrTableRow> = ({ container, selectedEntity }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const methodsCount = container?.interfaces.reduce(
        (acc, value) => acc + value.operations.length,
        0,
    );

    const disabled = container.interfaces.length === 0;

    useEffect(() => {
        if (
            selectedEntity &&
            (container.interfaces.map((i) => i.id).includes(Number(selectedEntity.id)) ||
                container.interfaces.map((i) => i.id).includes(Number(selectedEntity.interfaceId)))
        ) {
            setIsExpanded(true);
        }
    }, [selectedEntity]);

    return (
        <>
            <S.TableRowStyled expanded={isExpanded}>
                <TableData>
                    <S.NameContainer>
                        <S.IconButtonContainer>
                            {!disabled && (
                                <IconButton
                                    size="medium"
                                    iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                                    onClick={() => setIsExpanded(!isExpanded)}
                                />
                            )}
                        </S.IconButtonContainer>
                        <Text inactive={disabled} variant="body3">
                            {container.name}
                        </Text>
                    </S.NameContainer>
                </TableData>
                <TableData>
                    <Text inactive={disabled} variant="body3">
                        {container.code}
                    </Text>
                </TableData>
                <TableData>
                    <Text inactive={disabled} variant="body3">
                        {dayjs(container.updateDate ?? container.createDate)
                            .local()
                            .format('DD.MM.YYYY\u00A0HH:mm')}
                    </Text>
                </TableData>
                <TableData alignRight>
                    <Text inactive={disabled} variant="body3">
                        {container?.interfaces.length}
                    </Text>
                </TableData>
                <TableData alignRight>
                    <Text inactive={disabled} variant="body3">
                        {methodsCount}
                    </Text>
                </TableData>
                <TableData>
                    <Label
                        title={container.deletedDate ? 'Удален' : 'Активен'}
                        type={container.deletedDate ? 'error' : 'success'}
                    />
                </TableData>
            </S.TableRowStyled>
            {isExpanded && (
                <>
                    <TableRow>
                        <TableData colSpan={2}>
                            <S.TableHeadContainer first>Интерфейс</S.TableHeadContainer>
                        </TableData>
                        <TableData>
                            <S.TableHeadContainer>Статус</S.TableHeadContainer>
                        </TableData>
                        <TableData alignRight>
                            <S.TableHeadContainer>Кол-во методов</S.TableHeadContainer>
                        </TableData>
                    </TableRow>
                    {container.interfaces.map((structurizrInterface, i) => (
                        <ServiceTableRow
                            key={i}
                            structurizrInterface={structurizrInterface}
                            selectedEntity={selectedEntity}
                        />
                    ))}
                </>
            )}
        </>
    );
};
