import React, { FC, useState } from 'react';
import { IconButton, TableData } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { ServiceTableRow } from './components';
import { IStructurizrTableRow } from './types';
import * as S from './units';

export const StructurizrTableRow: FC<IStructurizrTableRow> = ({ container, originalContainer }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const methodsCount = originalContainer?.interfaces.reduce(
        (acc, value) => acc + value.operations.length,
        0,
    );

    const disabled = container.interfaces.length === 0;

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
                <TableData alignRight>
                    <Text inactive={disabled} variant="body3">
                        {originalContainer?.interfaces.length}
                    </Text>
                </TableData>
                <TableData alignRight>
                    <Text inactive={disabled} variant="body3">
                        {methodsCount}
                    </Text>
                </TableData>
            </S.TableRowStyled>
            {isExpanded &&
                container.interfaces.map((structurizrInterface, i) => (
                    <ServiceTableRow
                        key={i}
                        structurizrInterface={structurizrInterface}
                        originalStructurizrInterface={originalContainer?.interfaces.find(
                            (i) => i.id === structurizrInterface.id,
                        )}
                    />
                ))}
        </>
    );
};
