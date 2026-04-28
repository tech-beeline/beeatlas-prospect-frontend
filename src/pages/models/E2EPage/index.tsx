import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetStagingSequenceCjTreeQuery } from 'api/queries/staging-sequence';

import { MainContent, SideMenu } from './components';
import { IE2ETreeItem } from './types';
import * as S from './units';
import { formatFlatData, formatTreeData } from './utils';

export const E2EPage = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('id');
    const type = searchParams.get('type');

    const [activeItem, setActiveItem] = useState<IE2ETreeItem | null>(null);

    const { data: stagingSequenceCjTree } = useGetStagingSequenceCjTreeQuery();
    const treeData: IE2ETreeItem[] = formatTreeData(stagingSequenceCjTree);
    const flatData: IE2ETreeItem[] = formatFlatData(treeData);

    useEffect(() => {
        if (!code || !type || (activeItem?.code === code && activeItem?.type === type)) {
            return;
        }

        setActiveItem(flatData.find((item) => item.code === code && item.type === type) ?? null);
    }, [flatData, code, type]);

    return (
        <S.PageWrapper>
            <SideMenu activeItem={activeItem} treeData={treeData} flatData={flatData} />
            <MainContent activeItem={activeItem} />
        </S.PageWrapper>
    );
};
