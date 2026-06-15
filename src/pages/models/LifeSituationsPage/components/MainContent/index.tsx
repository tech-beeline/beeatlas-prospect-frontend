import React, { FC } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { Skeleton } from 'components/ui';

import { ItemTypes } from '../../types';

import { LifeSituationContent, RequirementContent } from './components';
import { IMainContent } from './types';
import * as S from './units';

export const MainContent: FC<IMainContent> = ({ activeItem, isAdmin, isLoading }) => {
    return (
        <S.Container>
            {isLoading && <Skeleton height={100} radius={12} />}
            {!activeItem && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        text="Начни поиск или выбери сущность из списка"
                    />
                </S.NotFoundContainer>
            )}
            {activeItem && activeItem.type === ItemTypes.ERROR && !isLoading && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.QUESTION_BOX}
                        text="Указана неверная ссылка"
                    />
                </S.NotFoundContainer>
            )}
            {activeItem && activeItem.type === ItemTypes.CHAPTER && (
                <LifeSituationContent activeItem={activeItem} isAdmin={isAdmin} />
            )}
            {activeItem && activeItem.type === ItemTypes.NFR && (
                <RequirementContent activeItem={activeItem} isAdmin={isAdmin} />
            )}
        </S.Container>
    );
};
