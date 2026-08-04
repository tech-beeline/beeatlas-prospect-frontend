import React, { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OldVersionBanner } from 'features/apps';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { E2EContentOptions, E2ETreeItemType } from '../../types';

import { BIContent, BIStepContent, CJContent, E2EContent } from './components';
import { IMainContent } from './types';
import * as S from './units';

const MainContent: FC<IMainContent> = ({ activeTreeItem, activeBiStep }) => {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');

    const contentOption = useMemo(() => {
        return (tab as E2EContentOptions) ?? E2EContentOptions.CJ;
    }, [tab]);

    return (
        <S.MainContent>
            <OldVersionBanner e2e />
            {!activeTreeItem && !activeBiStep && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        text="Начни поиск или выбери сущность из списка"
                    />
                </S.NotFoundContainer>
            )}
            {activeTreeItem && contentOption === E2EContentOptions.CJ && (
                <>
                    {activeTreeItem.type === E2ETreeItemType.CJ && (
                        <CJContent activeTreeItem={activeTreeItem} />
                    )}
                    {activeTreeItem.type === E2ETreeItemType.BI && (
                        <BIContent activeTreeItem={activeTreeItem} />
                    )}
                    {activeTreeItem.type === E2ETreeItemType.BI_STEP && (
                        <BIStepContent activeTreeItem={activeTreeItem} />
                    )}
                </>
            )}

            {activeBiStep && contentOption === E2EContentOptions.E2E && (
                <E2EContent activeBiStep={activeBiStep} />
            )}
        </S.MainContent>
    );
};
export default MainContent;
