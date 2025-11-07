import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Skeleton, Tab, Tabs } from '@beeline/design-system-react';
import { OldVersionBanner } from 'features/apps';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';

import { useGetProductInfoByCmdbQuery } from 'api/queries/product';
import * as R from 'router/const';

import {
    // ArchitectureChanges,
    // E2EProcesses,
    // FitnessFunctions,
    // GeneralInfo,
    InDevelopment,
    InterfacesAndMethods,
    // TechCapabilities,
    // Technologies,
} from './components';
import { TABS, TabVariants } from './const';
import * as S from './units';

export const AppViewPage = () => {
    const [params, setSearchParams] = useSearchParams();
    const paramTab = params.get('tab');
    const paramCmdb = params.get('cmdb');
    const [tabVariant, setTabVariant] = useState<TabVariants>(TabVariants.INTERFACES_AND_METHODS);

    useEffect(() => {
        setTabVariant(
            Object.values(TabVariants).includes(paramTab as TabVariants)
                ? (paramTab as TabVariants)
                : TabVariants.INTERFACES_AND_METHODS,
        );
    }, [paramTab]);

    const navigate = useNavigate();

    const { data: productData, isLoading: isLoadingProductData } =
        useGetProductInfoByCmdbQuery(paramCmdb);

    return (
        <S.PageWrapper>
            <S.HeaderContainer>
                <S.BannerContainer>
                    <OldVersionBanner cmdb={paramCmdb} />
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
                        {isLoadingProductData && <Skeleton height={32} width={200} radius={4} />}
                        {productData && <Text variant="h4">{productData.name}</Text>}
                        {/* <Label title="В эксплуатации" type="success" variant="contained" /> */}
                        {/* <Label title="Фитнес-функции с ошибкой" type="error" variant="contained" /> */}
                    </S.LabelContainer>
                </S.TitleContainer>
                {isLoadingProductData && <Skeleton height={22} width={120} radius={4} />}
                {productData && (
                    <Text inactive variant="body2">
                        {productData.alias}
                    </Text>
                )}
            </S.HeaderContainer>
            <S.TabsContainer>
                <Tabs selectedTabIndex={TABS.findIndex((tab) => tab.id === tabVariant)}>
                    {TABS.map((tab) => (
                        <Tab
                            key={tab.id}
                            label={tab.label}
                            value={tab.id}
                            onClick={() => setSearchParams({ tab: tab.id, cmdb: paramCmdb ?? '' })}
                        />
                    ))}
                </Tabs>
            </S.TabsContainer>

            {/* {tabVariant === TabVariants.GENERAL_INFO && (
                <GeneralInfo productData={productData} isLoading={isLoadingProductData} />
            )} */}
            {tabVariant === TabVariants.INTERFACES_AND_METHODS && (
                <InterfacesAndMethods
                    cmdb={paramCmdb}
                    structurizrApiUrl={productData?.structurizrApiUrl}
                    productId={Number(productData?.id)}
                />
            )}
            {tabVariant === TabVariants.FITNESS_FUNCTIONS && <InDevelopment cmdb={paramCmdb} />}
            {tabVariant === TabVariants.E2E_PROCESSES && <InDevelopment cmdb={paramCmdb} />}
            {tabVariant === TabVariants.TECH_CAPABILITIES && <InDevelopment cmdb={paramCmdb} />}
            {/* {tabVariant === TabVariants.FITNESS_FUNCTIONS && <FitnessFunctions />}
            {tabVariant === TabVariants.E2E_PROCESSES && <E2EProcesses />}
            {tabVariant === TabVariants.TECH_CAPABILITIES && <TechCapabilities />}
            {tabVariant === TabVariants.ARCHITECTURE_CHANGES && <ArchitectureChanges />}
            {tabVariant === TabVariants.TECHNOLOGIES && <Technologies />}
            {tabVariant === TabVariants.DATA && <InDevelopment />}
            {tabVariant === TabVariants.STANDS && <InDevelopment />} */}
        </S.PageWrapper>
    );
};
