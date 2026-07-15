import React, { FC } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { TableHeaderData } from 'components/ui';
import { TableBody, TableData, TableHead, TableRow } from 'components/ui';

import { IFitnessFunctions } from './types';
import * as S from './units';

export const FitnessFunctions: FC<IFitnessFunctions> = ({ fitnessFunctions }) => {
    const isEmpty = fitnessFunctions.length === 0;

    return (
        <S.Container>
            {isEmpty && (
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    text="Нет связанных фитнес-функций"
                />
            )}
            {!isEmpty && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>Код</TableHeaderData>
                            <TableHeaderData>Описание проверки</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fitnessFunctions.map((fitnessFunction) => (
                            <TableRow key={fitnessFunction.id}>
                                <TableData>{fitnessFunction.code}</TableData>
                                <TableData>{fitnessFunction.description}</TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </S.TableStyled>
            )}
        </S.Container>
    );
};
