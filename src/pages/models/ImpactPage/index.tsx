import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Button, Icon, IconButton, Tab, Tabs } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';

import { useModal } from 'hooks';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    AppTable,
    ContextDiagram,
    DeploymentAppTable,
    DeploymentDiagram,
    E2ETCTable,
    ImpactSearch,
    RateSideblock,
    SearchResults,
} from './components';
import { SearchVariants, TABS, TabVariant } from './const';
import * as S from './units';

export const ImpactPage = () => {
    const navigate = useNavigate();

    const [tabVariant, setTabVariant] = useState(TabVariant.IN);

    const [params] = useSearchParams();
    const searchParam = params.get('search');
    const searchVariantParam = params.get('searchVariant');
    const notFoundParam = params.get('notFound');
    // common
    const cmdbParam = params.get('cmdb');
    const nameParam = params.get('name');
    const idParam = params.get('id');

    const {
        modalOpened: sideblockOpened,
        openModal: openSideblock,
        closeModal: closeSideblock,
    } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleCopyLinkButtonClick = async () => {
        await navigator.clipboard.writeText(window.location.href);
        showSnackbar({ message: 'Ссылка скопирована' });
    };

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <Text variant="h4">Архитектура компании</Text>
                {cmdbParam && (
                    <Button
                        size="small"
                        variant="overlay"
                        startIcon={<Icon iconName={Icons.Star} />}
                        onClick={openSideblock}
                    >
                        Оценить сервис
                    </Button>
                )}
            </S.TitleContainer>
            <ImpactSearch />
            {notFoundParam && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.SEARCH}
                        title="Нет результатов, подходящих под параметры поиска"
                        text="Попробуйте изменить запрос"
                    />
                </S.NotFoundContainer>
            )}
            {typeof searchParam === 'string' && searchVariantParam && (
                <SearchResults
                    search={searchParam}
                    searchVariant={searchVariantParam as SearchVariants}
                />
            )}
            {cmdbParam && (
                <>
                    <S.BreadCrumbsContainer>
                        <Breadcrumbs>
                            <BreadCrumbsItem
                                name="Архитектура компании"
                                index={0}
                                id={0}
                                onClick={() => {
                                    navigate(`${R.MODELS_PATH}${R.IMPACT_PATH}`);
                                }}
                            />
                            <BreadCrumbsItem name="" index={1} id={1} />
                        </Breadcrumbs>
                    </S.BreadCrumbsContainer>
                    <S.AppTitleContainer>
                        <S.AppTitleIconWrapper>
                            {nameParam && <Text variant="h4">{nameParam}</Text>}
                            <IconButton
                                size="medium"
                                iconName={Icons.Link}
                                onClick={handleCopyLinkButtonClick}
                            />
                        </S.AppTitleIconWrapper>
                        <Text variant="subtitle3">
                            <Link
                                showIconPermanently
                                showOuterIcon
                                title="Общая информация"
                                url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${cmdbParam}`}
                            />
                        </Text>
                    </S.AppTitleContainer>
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
                    <S.GridContainer>
                        <S.FlexContainer>
                            {!idParam && (
                                <ContextDiagram cmdb={cmdbParam} tabVariant={tabVariant} />
                            )}
                            {idParam && <DeploymentDiagram id={idParam} tabVariant={tabVariant} />}
                        </S.FlexContainer>

                        <S.FlexContainer>
                            {!idParam && <AppTable cmdb={cmdbParam} tabVariant={tabVariant} />}
                            {idParam && <DeploymentAppTable id={idParam} tabVariant={tabVariant} />}
                            <E2ETCTable cmdb={cmdbParam} />
                        </S.FlexContainer>
                    </S.GridContainer>
                    <RateSideblock isOpen={sideblockOpened} onClose={closeSideblock} />
                </>
            )}
        </S.PageWrapper>
    );
};
