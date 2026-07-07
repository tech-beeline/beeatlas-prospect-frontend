import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageContext } from 'features/ai-context';
import { E2E_PAGE } from 'features/ai-context/page-context';

import {
    useGetStagingSequenceBiStepsQuery,
    useGetStagingSequenceCjTreeQuery,
} from 'api/queries/staging-sequence';

import { MainContent, SideMenu } from './components';
import { E2EContentOptions, E2ETreeItemType } from './types';
import * as S from './units';
import { formatFlatData, formatTreeData } from './utils';

export const E2EPage = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('id');
    const type = searchParams.get('type');
    const tab = searchParams.get('tab');
    const contentOption = (tab as E2EContentOptions) ?? E2EContentOptions.CJ;

    const { data: stagingSequenceCjTree, isLoading: isCjTreeLoading } =
        useGetStagingSequenceCjTreeQuery();
    const treeData = useMemo(() => formatTreeData(stagingSequenceCjTree), [stagingSequenceCjTree]);
    const flatTreeData = useMemo(() => formatFlatData(treeData), [treeData]);

    const { data: biSteps, isLoading: isBiStepsLoading } = useGetStagingSequenceBiStepsQuery();

    const isLoading = isCjTreeLoading || isBiStepsLoading;

    const activeTreeItem = useMemo(() => {
        if (!code || !type) return null;
        return flatTreeData.find((item) => item.code === code && item.type === type) ?? null;
    }, [flatTreeData, code, type]);

    const activeBiStep = useMemo(() => {
        if (!code || !type) return null;
        return biSteps?.find((item) => item.code === code) ?? null;
    }, [biSteps, code, type]);

    const entityType = useMemo(() => {
        if (contentOption === E2EContentOptions.E2E && activeBiStep) {
            return 'bi-step';
        }
        if (!activeTreeItem) return undefined;

        switch (activeTreeItem.type) {
            case E2ETreeItemType.CJ:
                return 'cj';
            case E2ETreeItemType.BI:
                return 'bi';
            case E2ETreeItemType.BI_STEP:
                return 'bi-step';
        }
    }, [contentOption, activeTreeItem, activeBiStep]);

    const entityId = useMemo(() => {
        if (contentOption === E2EContentOptions.E2E && activeBiStep) {
            return activeBiStep.id;
        }
        return activeTreeItem?.id;
    }, [contentOption, activeTreeItem, activeBiStep]);

    usePageContext({
        page: E2E_PAGE,
        entityType,
        entityId,
        activeTab: contentOption,
    });

    return (
        <S.PageWrapper>
            <SideMenu
                activeTreeItem={activeTreeItem}
                activeBiStep={activeBiStep}
                treeData={treeData}
                flatTreeData={flatTreeData}
                biSteps={biSteps ?? []}
                isLoading={isLoading}
            />
            <MainContent activeTreeItem={activeTreeItem} activeBiStep={activeBiStep} />
        </S.PageWrapper>
    );
};
