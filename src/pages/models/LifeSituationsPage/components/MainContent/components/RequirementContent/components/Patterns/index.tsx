import React, { FC } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { TableBody } from 'components/ui';

import { PatternRow } from './components';
import { IPatterns } from './types';
import * as S from './units';

export const Patterns: FC<IPatterns> = ({ patterns }) => {
    const isEmpty = patterns.length === 0;

    return (
        <S.Container>
            {isEmpty && (
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    text="Нет связанных паттернов"
                />
            )}
            {!isEmpty && (
                <S.TableStyled>
                    <TableBody>
                        {patterns.map((pattern) => (
                            <PatternRow key={pattern.id} pattern={pattern} />
                        ))}
                    </TableBody>
                </S.TableStyled>
            )}
        </S.Container>
    );
};
