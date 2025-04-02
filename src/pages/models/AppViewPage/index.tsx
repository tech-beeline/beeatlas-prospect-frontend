import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Label, Tab, Tabs } from '@beeline/design-system-react';
import { OldVersionBanner } from 'features/apps';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';

import * as R from 'router/const';

import {
    ArchitectureChanges,
    E2EProcesses,
    FitnessFunctions,
    GeneralInfo,
    InDevelopment,
    InterfacesAndMethods,
    TechCapabilities,
    Technologies,
} from './components';
import { TABS, TabVariants } from './const';
import * as S from './units';

export const AppViewPage = () => {
    const [params, setSearchParams] = useSearchParams();
    const paramTab = params.get('tab');
    const [tabVariant, setTabVariant] = useState<TabVariants>(TabVariants.GENERAL_INFO);

    useEffect(() => {
        setTabVariant(
            Object.values(TabVariants).includes(paramTab as TabVariants)
                ? (paramTab as TabVariants)
                : TabVariants.GENERAL_INFO,
        );
    }, [paramTab]);

    const navigate = useNavigate();

    return (
        <S.PageWrapper>
            <S.HeaderContainer>
                <S.BannerContainer>
                    <OldVersionBanner />
                </S.BannerContainer>
                <Breadcrumbs>
                    <BreadCrumbsItem
                        name="Каталог приложений"
                        index={0}
                        id={0}
                        onClick={() => {
                            navigate(`${R.MODELS_PATH}${R.APPS_PATH}`);
                        }}
                    />
                    <BreadCrumbsItem name="" index={1} id={1} />
                </Breadcrumbs>
                <S.TitleContainer>
                    <S.LabelContainer>
                        <Text variant="h4">B2C DIGITAL RETAIL DELIVERY CATALOG</Text>
                        <Label title="В эксплуатации" type="success" variant="contained" />
                        <Label title="Фитнес-функции с ошибкой" type="error" variant="contained" />
                        <Label title="Mission Critical" variant="contained" />
                    </S.LabelContainer>
                </S.TitleContainer>
                <Text inactive variant="body2">
                    B2C DIGITAL RETAIL DELIVERY CATALOG
                </Text>
            </S.HeaderContainer>
            <S.TabsContainer>
                <Tabs selectedTabIndex={TABS.findIndex((tab) => tab.id === tabVariant)}>
                    {TABS.map((tab) => (
                        <Tab
                            key={tab.id}
                            label={tab.label}
                            value={tab.id}
                            onClick={() => setSearchParams({ tab: tab.id })}
                        />
                    ))}
                </Tabs>
            </S.TabsContainer>

            {tabVariant === TabVariants.GENERAL_INFO && <GeneralInfo />}
            {tabVariant === TabVariants.FITNESS_FUNCTIONS && <FitnessFunctions />}
            {tabVariant === TabVariants.E2E_PROCESSES && <E2EProcesses />}
            {tabVariant === TabVariants.TECH_CAPABILITIES && <TechCapabilities />}
            {tabVariant === TabVariants.INTERFACES_AND_METHODS && <InterfacesAndMethods />}
            {tabVariant === TabVariants.ARCHITECTURE_CHANGES && <ArchitectureChanges />}
            {tabVariant === TabVariants.TECHNOLOGIES && <Technologies />}
            {tabVariant === TabVariants.DATA && <InDevelopment />}
            {tabVariant === TabVariants.STANDS && <InDevelopment />}
        </S.PageWrapper>
    );
};
