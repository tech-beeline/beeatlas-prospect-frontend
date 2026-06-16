import React, { FC } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other/NotFoundBlock';

import { DisplayOptions } from '../../types';

import { RequirementCard, RequirementsTable } from './components';
import { IRequirements } from './types';
import * as S from './units';
import { groupDataByColumns } from './utils';

export const Requirements: FC<IRequirements> = ({ displayOption, activeItem }) => {
    const columns = groupDataByColumns(activeItem.chapterData.nfr);

    const isEmpty = activeItem.chapterData.nfr.length === 0;

    return (
        <>
            {isEmpty && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        text="Нет связанных требований"
                    />
                </S.NotFoundContainer>
            )}
            {displayOption === DisplayOptions.TABLE && !isEmpty && (
                <RequirementsTable nfr={activeItem.chapterData.nfr} activeItem={activeItem} />
            )}
            {displayOption === DisplayOptions.GRID && !isEmpty && (
                <S.CardsGrid>
                    {columns.map((column, index) => (
                        <S.CardsColumn key={index}>
                            {column.map((n) => (
                                <RequirementCard key={n.id} nfr={n} activeItem={activeItem} />
                            ))}
                        </S.CardsColumn>
                    ))}
                </S.CardsGrid>
            )}
        </>
    );
};
