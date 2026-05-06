import React, { FC, useState } from 'react';
import { Icon, Tab, Tabs } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Link } from 'components/other';

import * as R from 'router/const';

import { E2ETreeItemType, IE2EBiStepItem } from '../../../../types';

import { CallsContent, ObservabilityContent } from './components';
import { TABS, TabVariants } from './const';
import { IBIStepContent } from './types';
import * as S from './units';

export const BIStepContent: FC<IBIStepContent> = ({ activeItem }) => {
    const [tabVariant, setTabVariant] = useState<TabVariants>(TabVariants.CALLS);

    return (
        <>
            <S.TitleContainer>
                <S.BreadcrumbsContainer>
                    <Link
                        outer={false}
                        title={(activeItem as IE2EBiStepItem).cjData.cjName}
                        url={`${R.MODELS_PATH}${R.E2E_PATH}?type=${E2ETreeItemType.CJ}&id=${
                            (activeItem as IE2EBiStepItem).cjData.cjCode
                        }`}
                    />
                    <Icon iconName={Icons.NavArrowRight} size="small" />
                    <Link
                        outer={false}
                        title={(activeItem as IE2EBiStepItem).biData.biName}
                        url={`${R.MODELS_PATH}${R.E2E_PATH}?type=${E2ETreeItemType.BI}&id=${
                            (activeItem as IE2EBiStepItem).biData.biCode
                        }`}
                    />
                    <Icon iconName={Icons.NavArrowRight} size="small" />
                </S.BreadcrumbsContainer>
                <Text variant="h4">{activeItem.title}</Text>
                <Text inactive variant="body3">
                    {activeItem.code}
                </Text>
            </S.TitleContainer>
            <S.TabsContainer>
                <Tabs selectedTabIndex={TABS.findIndex((tab) => tab.id === tabVariant)}>
                    {TABS.map((tab) => (
                        <Tab
                            key={tab.id}
                            label={tab.label}
                            value={tab.id}
                            onClick={() => setTabVariant(tab.id)}
                        />
                    ))}
                </Tabs>
            </S.TabsContainer>
            {tabVariant === TabVariants.CALLS && <CallsContent code={activeItem.code} />}
            {tabVariant === TabVariants.OBSERVABILITY && (
                <ObservabilityContent code={activeItem.code} />
            )}
        </>
    );
};
