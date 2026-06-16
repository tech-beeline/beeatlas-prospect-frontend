import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { TableBody, TableData, TableHead, TableHeaderData, TableRow } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IFitnessFunctionsRow } from './types';
import * as S from './units';

export const FitnessFunctionsRow: FC<IFitnessFunctionsRow> = ({ fitnessFunctions }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isEmpty = fitnessFunctions.length === 0;

    return (
        <>
            <TableRow>
                <TableData colSpan={9}>
                    <S.CellContent>
                        <IconButton
                            iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setIsExpanded(!isExpanded)}
                            size="medium"
                        />
                        Набор фитнес-функций, успешное прохождение которых автоматически назначает
                        НФТ к приложению
                    </S.CellContent>
                </TableData>
            </TableRow>
            {isExpanded && (
                <>
                    {isEmpty && (
                        <TableRow>
                            <S.TableDataEmpty colSpan={9}>
                                <Text inactive variant="body2">
                                    Нет связанных фитнес-функций
                                </Text>
                            </S.TableDataEmpty>
                        </TableRow>
                    )}
                    {!isEmpty && (
                        <TableRow>
                            <S.TableDataStyled colSpan={9}>
                                <S.TableStyled>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeaderData>Код</TableHeaderData>
                                            <TableHeaderData>Описание проверки</TableHeaderData>
                                            <TableHeaderData>Методика</TableHeaderData>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fitnessFunctions.map((fitnessFunction) => (
                                            <TableRow key={fitnessFunction.id}>
                                                <TableData>{fitnessFunction.code}</TableData>
                                                <TableData>{fitnessFunction.description}</TableData>
                                                <TableData>
                                                    <Link url={fitnessFunction.docLink} />
                                                </TableData>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </S.TableStyled>
                            </S.TableDataStyled>
                        </TableRow>
                    )}
                </>
            )}
        </>
    );
};
