import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdditionalPageContext } from 'features/ai-context/hooks';
import { BI_STEP_TAB_ID_PARAM, BI_STEP_TAB_PARAM } from 'features/e2e';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { Icon, Tab, Tabs } from 'components/ui';

import { useGetUsecasesByBiStepCodeQuery } from 'api/queries/usecase';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { E2ETreeItemType, IE2EBiStepItem } from '../../../../types';

import { CallsContent, ObservabilityContent, UsecaseCallsContent } from './components';
import { TABS, TabVariants } from './const';
import { IBIStepContent } from './types';
import * as S from './units';
import { getTabLabel, getTabVariant } from './utils';

export const BIStepContent: FC<IBIStepContent> = ({ activeTreeItem }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabVariant = getTabVariant(searchParams.get(BI_STEP_TAB_PARAM));
    const implementationId = searchParams.get(BI_STEP_TAB_ID_PARAM);
    const e2eCodes =
        activeTreeItem.type === E2ETreeItemType.BI_STEP ? activeTreeItem.e2eCodes : [];
    const { data: usecases = [] } = useGetUsecasesByBiStepCodeQuery(
        activeTreeItem.type === E2ETreeItemType.BI_STEP ? activeTreeItem.code : null,
    );

    useAdditionalPageContext('biStepContentTab', tabVariant);

    const updateParams = (patch: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(patch).forEach(([key, value]) =>
            value === null ? params.delete(key) : params.set(key, value),
        );
        setSearchParams(params, { replace: true });
    };

    const selectTab = (param: string) =>
        updateParams({ [BI_STEP_TAB_PARAM]: param, [BI_STEP_TAB_ID_PARAM]: null });

    const selectImplementation = (id: string) => updateParams({ [BI_STEP_TAB_ID_PARAM]: id });

    return (
        <>
            <S.TitleContainer>
                <S.BreadcrumbsContainer>
                    <Link
                        outer={false}
                        title={(activeTreeItem as IE2EBiStepItem).cjData.cjName}
                        url={`${R.MODELS_PATH}${R.E2E_PATH}?type=${E2ETreeItemType.CJ}&id=${
                            (activeTreeItem as IE2EBiStepItem).cjData.cjCode
                        }`}
                    />
                    <Icon iconName={Icons.NavArrowRight} size="small" />
                    <Link
                        outer={false}
                        title={(activeTreeItem as IE2EBiStepItem).biData.biName}
                        url={`${R.MODELS_PATH}${R.E2E_PATH}?type=${E2ETreeItemType.BI}&id=${
                            (activeTreeItem as IE2EBiStepItem).biData.biCode
                        }`}
                    />
                    <Icon iconName={Icons.NavArrowRight} size="small" />
                </S.BreadcrumbsContainer>
                <Text variant="h4">{activeTreeItem.title}</Text>
                <Text inactive variant="body3">
                    {activeTreeItem.code}
                </Text>
            </S.TitleContainer>
            <S.TabsContainer>
                <Tabs selectedTabIndex={TABS.findIndex((tab) => tab.id === tabVariant)}>
                    {TABS.map((tab) => (
                        <Tab
                            key={tab.id}
                            label={getTabLabel(tab.id, tab.label, e2eCodes.length, usecases.length)}
                            value={tab.id}
                            onClick={() => selectTab(tab.param)}
                        />
                    ))}
                </Tabs>
            </S.TabsContainer>
            {tabVariant === TabVariants.CALLS &&
                activeTreeItem.type === E2ETreeItemType.BI_STEP && (
                    <CallsContent
                        e2eCodes={activeTreeItem.e2eCodes}
                        selectedId={implementationId}
                        onSelect={selectImplementation}
                    />
                )}
            {tabVariant === TabVariants.USECASE_CALLS &&
                activeTreeItem.type === E2ETreeItemType.BI_STEP && (
                    <UsecaseCallsContent
                        biStepCode={activeTreeItem.code}
                        selectedId={implementationId}
                        onSelect={selectImplementation}
                    />
                )}
            {tabVariant === TabVariants.OBSERVABILITY &&
                activeTreeItem.type === E2ETreeItemType.BI_STEP && (
                    <ObservabilityContent
                        biStepCode={activeTreeItem.code}
                        e2eCodes={activeTreeItem.e2eCodes}
                        usecases={usecases}
                    />
                )}
        </>
    );
};
