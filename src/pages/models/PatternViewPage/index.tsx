import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, Icon, IconButton, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';

import * as R from 'router/const';

import * as S from './units';

const isLoading = false;

export const PatternViewPage = () => {
    // const [params] = useSearchParams();
    // const paramId = params.get('id');

    const [isTechnologiesExpanded, setIsTechnologiesExpanded] = useState(false);
    const [isLinksExpanded, setIsLinksExpanded] = useState(false);
    const [isAppsExpanded, setIsAppsExpanded] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const navigate = useNavigate();

    const handleBreadcrumbClick = () => {
        navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}`);
    };

    return (
        <S.PageWrapper>
            <S.Container>
                <S.HeaderContainer>
                    <S.BreadcrumbContainer>
                        <Text link pointer variant="body3" onClick={handleBreadcrumbClick}>
                            Каталог паттернов
                        </Text>
                        <Icon iconName={Icons.NavArrowRight} size="small" />
                    </S.BreadcrumbContainer>
                    <S.SpaceBetweenContainer>
                        <S.TitleContainer>
                            <Text variant="h4">Витрина данных (Data Mart)</Text>
                            <Label title="Паттерн" variant="contained" type="success" />
                        </S.TitleContainer>
                        <S.ButtonsContainer>
                            <Button startIcon={<Icon iconName={Icons.Download} />} />
                        </S.ButtonsContainer>
                    </S.SpaceBetweenContainer>
                    <S.LabelsContainer>
                        <Chip label="Архитектурный каталог Beeline" />
                        <Chip label="Data products" />
                        <Chip label="Structurizr OnPremise" />
                        <Chip label="Structurizr Lite" />
                    </S.LabelsContainer>
                </S.HeaderContainer>

                {isLoading && (
                    <S.GridContainer>
                        <Skeleton height={348} radius={12} />
                        <S.FlexContainer>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} height={100} radius={12} />
                            ))}
                        </S.FlexContainer>
                    </S.GridContainer>
                )}

                {!isLoading && (
                    <S.GridContainer>
                        <div>
                            <S.NotFoundContainer>
                                <NotFoundBlock
                                    title="Нет данных"
                                    text="Паттерн/антипаттерн еще не описан"
                                    imageVariant={ImageVariants.EMPTY_BOX}
                                />
                            </S.NotFoundContainer>
                        </div>
                        <S.FlexContainer>
                            <S.ExpandableContainer>
                                <S.SpaceBetweenContainer>
                                    <Text variant="h6">Технологии</Text>
                                    <IconButton
                                        iconName={
                                            isTechnologiesExpanded
                                                ? Icons.NavArrowUp
                                                : Icons.NavArrowDown
                                        }
                                        onClick={() =>
                                            setIsTechnologiesExpanded(!isTechnologiesExpanded)
                                        }
                                        size="large"
                                    />
                                </S.SpaceBetweenContainer>
                                {isTechnologiesExpanded && (
                                    <>
                                        <S.SpaceBetweenContainer>
                                            <Text variant="body2">Structurizr OnPremise</Text>
                                            <S.TechnologyLabelsContainer>
                                                <Label
                                                    title="Adopt"
                                                    variant="contained"
                                                    type="success"
                                                />
                                                <Label
                                                    title="Допустимо КИ"
                                                    variant="outline"
                                                    type="success"
                                                />
                                            </S.TechnologyLabelsContainer>
                                        </S.SpaceBetweenContainer>
                                        <S.SpaceBetweenContainer>
                                            <Text variant="body2">Structurizr Lite</Text>
                                            <S.TechnologyLabelsContainer>
                                                <Label
                                                    title="Trial"
                                                    variant="contained"
                                                    type="warning"
                                                />
                                                <Label
                                                    title="Недопустимо КИ"
                                                    variant="outline"
                                                    type="error"
                                                />
                                            </S.TechnologyLabelsContainer>
                                        </S.SpaceBetweenContainer>
                                    </>
                                )}
                            </S.ExpandableContainer>
                            <S.ExpandableContainer>
                                <S.SpaceBetweenContainer>
                                    <Text variant="h6">Ссылки ADR</Text>
                                    <IconButton
                                        iconName={
                                            isLinksExpanded ? Icons.NavArrowUp : Icons.NavArrowDown
                                        }
                                        onClick={() => setIsLinksExpanded(!isLinksExpanded)}
                                        size="large"
                                    />
                                </S.SpaceBetweenContainer>
                                {isLinksExpanded && (
                                    <>
                                        <Link url="/" />
                                        <Link url="/" />
                                        <Link url="/" />
                                        <Link url="/" />
                                    </>
                                )}
                            </S.ExpandableContainer>
                            <S.ExpandableContainer>
                                <S.SpaceBetweenContainer>
                                    <S.AppsTitleContainer>
                                        <Text variant="h6">Приложения (4) </Text>
                                        <IconButton
                                            iconName={Icons.InfoCircled}
                                            size="large"
                                            data-tooltip-id="apps-info"
                                        />
                                        <TooltipContainer
                                            noArrow
                                            largePadding
                                            place="top"
                                            offset={8}
                                            id="apps-info"
                                        >
                                            Список приложений регулярно обновляется из разных
                                            источников автоматически
                                        </TooltipContainer>
                                    </S.AppsTitleContainer>
                                    <IconButton
                                        iconName={
                                            isAppsExpanded ? Icons.NavArrowUp : Icons.NavArrowDown
                                        }
                                        onClick={() => setIsAppsExpanded(!isAppsExpanded)}
                                        size="large"
                                    />
                                </S.SpaceBetweenContainer>
                                {isAppsExpanded && (
                                    <>
                                        {/* {isLoadingProducts &&
                                            Array.from({ length: 3 }).map((_, i) => (
                                                <Skeleton key={i} height={40} radius={12} />
                                            ))}
                                        {productsData?.length === 0 && (
                                            <Text variant="body2">
                                                Нет информации о приложениях, но мы работаем над
                                                этим
                                            </Text>
                                        )} */}
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <S.SpaceBetweenContainer key={i}>
                                                <div>
                                                    <Text variant="body2">BeeAtlas (App)</Text>
                                                    <Text inactive variant="body3">
                                                        FDMSHOWCASEAPP
                                                    </Text>
                                                </div>
                                                <Button
                                                    startIcon={
                                                        <Icon iconName={Icons.OpenInBrowser} />
                                                    }
                                                    onClick={() => {
                                                        window.open(
                                                            `${R.MODELS_PATH}${R.APPS_PATH}?alias=FDMSHOWCASEAPP`,
                                                        );
                                                    }}
                                                >
                                                    Карточка приложения
                                                </Button>
                                            </S.SpaceBetweenContainer>
                                        ))}
                                    </>
                                )}
                            </S.ExpandableContainer>
                            <S.ExpandableContainer>
                                <S.SpaceBetweenContainer>
                                    <Text variant="h6">Описание архитектуры в structurize dsl</Text>
                                    <IconButton
                                        iconName={
                                            isDescriptionExpanded
                                                ? Icons.NavArrowUp
                                                : Icons.NavArrowDown
                                        }
                                        onClick={() =>
                                            setIsDescriptionExpanded(!isDescriptionExpanded)
                                        }
                                        size="large"
                                    />
                                </S.SpaceBetweenContainer>
                                {isDescriptionExpanded && (
                                    <S.DescriptionContainer>
                                        <Text variant="body2">{`workspace {
    name "имя продукта"
    description "описание продукта"

    # включаем режим с иерархической системой идентификаторов
    !identifiers hierarchical

    model {
        properties { 
            structurizr.groupSeparator "/"
            workspace_cmdb "cmdb_mnemonic"
            architect "имя архитектора"
        }

        my_system = softwareSystem "system name"{
            scheme1 = container "Database scheme name"{
                technology "PostgreSQL 14"
                tags "postgre"
            }
            srv1 = container "Service" {
                technology "Spring"
                tags "java"
                -> scheme1 "Запрос/изменение данных" "SQL TCP:5432"
            }
        }

        deploymentEnvironment "PROD" {
                deploymentNode "PROTECTED STD OPS" {
                        deploymentNode "pod_name_4" {
                            containerInstance my_system.srv1
                        }

                        # СУБД PostgreSQL в облаке Vega
                        deploymentNode "pod_name_7" {
                            containerInstance my_system.scheme1
                            properties {
                                "vega_project"              "Код проекта в Vega"
                                "region"                    "Ярославль M6 Openstack 3 Inside"
                                "flavour"                   "cpu2ram16"
                                "volume_size"               "500"
                                "version"                   "14"
                                "backup_strategies"         "backup-off"
                                "type"                      "postgresql"
                                "deployment_configuration"  "standby"
                            }
                        }
                    }
                }
    }

    views {
        # Конфигурируем настройки отображения plant uml
        properties {
            plantuml.url        "https://structurizr.vimpelcom.ru/plantuml"
            kroki.url           "https://kroki.vimpelcom.ru"
            plantuml.format     "svg"
            kroki.format        "svg"
            structurizr.sort created
            structurizr.tooltips true
        }

        # Задаем стили для отображения
        theme https://structurizr.vimpelcom.ru/themes/beeline.json

        deployment * "PROD" {
            include *
            autoLayout lr
        }

    }
}`}</Text>
                                    </S.DescriptionContainer>
                                )}
                            </S.ExpandableContainer>
                        </S.FlexContainer>
                    </S.GridContainer>
                )}
            </S.Container>
        </S.PageWrapper>
    );
};
