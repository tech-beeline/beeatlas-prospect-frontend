import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import { Breadcrumbs, Button, Icon, Tab, Tabs } from 'components/ui';

import { useModal } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
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
import { TABS, TabVariant } from './const';
import { IImpactBreadcrumb } from './types';
import * as S from './units';

export const ImpactPage = () => {
    const navigate = useNavigate();

    const [tabVariant, setTabVariant] = useState(TabVariant.IN);

    const [params] = useSearchParams();
    const searchParam = params.get('search');
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

    const [breadcrumbs, setBreadcrumbs] = useState<IImpactBreadcrumb[]>([]);

    useEffect(() => {
        if (nameParam && cmdbParam) {
            setBreadcrumbs([
                { name: nameParam, link: window.location.pathname + window.location.search },
            ]);
        }
    }, []);

    const [visitedPages, setVisitedPages] = useState<string[]>([]);

    useEffect(() => {
        if (nameParam) {
            setVisitedPages([...visitedPages, nameParam]);
        }
    }, [nameParam]);

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
            <ImpactSearch setBreadcrumbs={setBreadcrumbs} />
            {notFoundParam && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.SEARCH}
                        title="Нет результатов, подходящих под параметры поиска"
                        text="Попробуйте изменить запрос"
                    />
                </S.NotFoundContainer>
            )}
            {typeof searchParam === 'string' && (
                <SearchResults
                    search={searchParam}
                    setBreadcrumbs={setBreadcrumbs}
                    visitedPages={visitedPages}
                />
            )}
            {cmdbParam && (
                <>
                    <S.BreadCrumbsContainer>
                        <Breadcrumbs>
                            {[
                                <BreadCrumbsItem
                                    key={0}
                                    index={0}
                                    id={0}
                                    name="Архитектура компании"
                                    onClick={() => {
                                        navigate(`${R.MODELS_PATH}${R.IMPACT_PATH}`);
                                    }}
                                />,
                                ...breadcrumbs
                                    .slice(0, breadcrumbs.length - 1)
                                    .map((breadcrumb, i) => (
                                        <BreadCrumbsItem
                                            key={i + 1}
                                            index={i + 1}
                                            id={i + 1}
                                            name={breadcrumb.name}
                                            onClick={() => {
                                                navigate(breadcrumb.link);
                                                setBreadcrumbs(breadcrumbs.slice(0, i + 1));
                                            }}
                                        />
                                    )),
                                <BreadCrumbsItem
                                    name=""
                                    key={Infinity}
                                    index={Infinity}
                                    id={Infinity}
                                />,
                            ]}
                        </Breadcrumbs>
                    </S.BreadCrumbsContainer>
                    <S.AppTitleContainer>
                        <S.AppInfoContainer>
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
                        </S.AppInfoContainer>
                        {cmdbParam && (
                            <Text inactive variant="body3">
                                {cmdbParam}
                            </Text>
                        )}
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
                            {!idParam && (
                                <AppTable
                                    cmdb={cmdbParam}
                                    tabVariant={tabVariant}
                                    breadcrumbs={breadcrumbs}
                                    setBreadcrumbs={setBreadcrumbs}
                                />
                            )}
                            {idParam && (
                                <DeploymentAppTable
                                    id={idParam}
                                    tabVariant={tabVariant}
                                    breadcrumbs={breadcrumbs}
                                    setBreadcrumbs={setBreadcrumbs}
                                />
                            )}
                            <E2ETCTable cmdb={cmdbParam} />
                        </S.FlexContainer>
                    </S.GridContainer>
                    <RateSideblock isOpen={sideblockOpened} onClose={closeSideblock} />
                </>
            )}
        </S.PageWrapper>
    );
};
