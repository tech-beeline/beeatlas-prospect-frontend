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

import { ImageVariants, Link, NotFoundBlock } from 'components/other';

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
                        Набор ФФ успешное прохождение которых, автоматически назначает НФТ к
                        приложению
                    </S.CellContent>
                </TableData>
            </TableRow>
            {isExpanded && (
                <>
                    {isEmpty && (
                        <TableRow>
                            <S.TableDataFullWidth colSpan={9}>
                                <S.NotFoundBlockContainer>
                                    <NotFoundBlock
                                        imageVariant={ImageVariants.EMPTY_BOX}
                                        text="Нет связанных фитнес-функций"
                                    />
                                </S.NotFoundBlockContainer>
                            </S.TableDataFullWidth>
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
