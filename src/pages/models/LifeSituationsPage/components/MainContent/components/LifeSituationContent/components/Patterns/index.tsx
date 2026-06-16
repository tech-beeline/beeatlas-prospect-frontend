import React, { FC } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { DisplayOptions } from '../../types';

import { groupDataByColumns } from './components/utils';
import { PatternCard, PatternsTable } from './components';
import { IPatterns } from './types';
import * as S from './units';

export const Patterns: FC<IPatterns> = ({ displayOption, patterns, activeItem }) => {
    const columns = groupDataByColumns(patterns);

    const isEmpty = patterns.length === 0;

    return (
        <>
            {isEmpty && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        text="Нет связанных паттернов"
                    />
                </S.NotFoundContainer>
            )}
            {displayOption === DisplayOptions.TABLE && !isEmpty && (
                <PatternsTable patterns={patterns} activeItem={activeItem} />
            )}
            {displayOption === DisplayOptions.GRID && !isEmpty && (
                <S.CardsGrid>
                    {columns.map((column, index) => (
                        <S.CardsColumn key={index}>
                            {column.map((pattern) => (
                                <PatternCard
                                    key={pattern.id}
                                    pattern={pattern}
                                    activeItem={activeItem}
                                />
                            ))}
                        </S.CardsColumn>
                    ))}
                </S.CardsGrid>
            )}
        </>
    );
};
