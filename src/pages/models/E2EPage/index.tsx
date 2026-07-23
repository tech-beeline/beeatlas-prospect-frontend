import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
    useGetStagingSequenceBiStepsQuery,
    useGetStagingSequenceCjTreeQuery,
} from 'api/queries/staging-sequence';

import { MainContent, SideMenu } from './components';
import * as S from './units';
import { formatFlatData, formatTreeData } from './utils';

export const E2EPage = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('id');
    const type = searchParams.get('type');

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
