import React, { FC } from 'react';
import { OldVersionBanner } from 'features/apps';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { E2ETreeItemType } from '../../types';

import { BIContent, BIStepContent, CJContent } from './components';
import { IMainContent } from './types';
import * as S from './units';

export const MainContent: FC<IMainContent> = ({ activeItem }) => {
    return (
        <S.MainContent>
            <OldVersionBanner e2e />
            {!activeItem && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        text="Начни поиск или выбери сущность из списка"
                    />
                </S.NotFoundContainer>
            )}
            {activeItem && activeItem.type === E2ETreeItemType.CJ && (
                <CJContent activeItem={activeItem} />
            )}
            {activeItem && activeItem.type === E2ETreeItemType.BI && (
                <BIContent activeItem={activeItem} />
            )}
            {activeItem && activeItem.type === E2ETreeItemType.BI_STEP && (
                <BIStepContent activeItem={activeItem} />
            )}
        </S.MainContent>
    );
};
