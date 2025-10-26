import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Chip, Icon, IconButton, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { ringIdToLabelStatusMap } from 'features/technologies';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';

import { useGetPatternByIdQuery } from 'api/queries/patterns';
import { useModal } from 'hooks';
import * as R from 'router/const';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as S from './units';

export const PatternViewPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const [isTechnologiesExpanded, setIsTechnologiesExpanded] = useState(false);
    const [isLinksExpanded, setIsLinksExpanded] = useState(false);
    const [isAppsExpanded, setIsAppsExpanded] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { modalOpened, openModal, closeModal } = useModal();

    const navigate = useNavigate();

    const handleBreadcrumbClick = () => {
        navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}`);
    };

    const { data, isLoading } = useGetPatternByIdQuery(paramId);

    const [isSubscribed, setIsSubcribe] = useState(false);

    const handleSubscribeButtonClick = async () => {
        if (isSubscribed) {
            openModal();
        } else {
            setIsSubcribe(true);
            showSnackbar({
                message:
                    'Вы подписались на изменения технологии. Уведомления будут отображаться на витрине ФДМ',
            });
        }
    };

    const handleUnsubscribeButtonClick = async () => {
        setIsSubcribe(true);
        closeModal();
        showSnackbar({
            message: 'Вы отписаны от уведомлений',
        });
    };

    {
        /* const handleExportButtonClick = () => {
        if (fileData && technologyData) {
            downloadTextFile(`${technologyData.label}.md`, fileData.file);
        }
    };*/
    }

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
                        {isLoading && <Skeleton height={32} width={100} radius={4} />}
                        {data && (
                            <S.TitleContainer>
                                <Text variant="h4">{data.name}</Text>
                                <Label
                                    title={data.isAntiPattern ? 'Антипаттерн' : 'Паттерн'}
                                    variant="contained"
                                    type={data.isAntiPattern ? 'error' : 'success'}
                                />
                            </S.TitleContainer>
                        )}
                        <S.ButtonsContainer>
                            {/* {fileData && (
                                <Button
                                    disabled={isLoadingFileData || isLoadingTechnology}
                                    startIcon={<Icon iconName={Icons.ShareIos} />}
                                    onClick={handleExportButtonClick}
                                >
                                    Экспорт
                                </Button>
                            )}*/}
                            <Button
                                startIcon={
                                    <Icon
                                        iconName={
                                            isSubscribed
                                                ? Icons.NotificationOff
                                                : Icons.Notification
                                        }
                                    />
                                }
                                onClick={handleSubscribeButtonClick}
                            >
                                {isSubscribed ? 'Отписаться' : 'Подписаться'}
                            </Button>
                        </S.ButtonsContainer>
                    </S.SpaceBetweenContainer>
                    {(isLoading || (data && data.groups.length !== 0)) && (
                        <S.LabelsContainer>
                            {isLoading &&
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} height={32} width={100} radius={16} />
                                ))}
                            {data?.groups.map((group) => (
                                <Chip key={group.id} label={group.name} />
                            ))}
                        </S.LabelsContainer>
                    )}
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

                {data && (
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
                                    <Text variant="h6">
                                        Технологии ({data.technologies.length})
                                    </Text>
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
                                        {data.technologies.map((tech) => (
                                            <S.SpaceBetweenContainer key={tech.id}>
                                                <Text variant="body2">{tech.label}</Text>
                                                <S.TechnologyLabelsContainer>
                                                    <Label
                                                        title={tech.ring.name}
                                                        variant="contained"
                                                        type={ringIdToLabelStatusMap[tech.ring.id]}
                                                    />
                                                    <Label
                                                        title={
                                                            tech.isCritical
                                                                ? 'Допустимо КИ'
                                                                : 'Недопустимо КИ'
                                                        }
                                                        variant="outline"
                                                        type={tech.isCritical ? 'success' : 'error'}
                                                    />
                                                </S.TechnologyLabelsContainer>
                                            </S.SpaceBetweenContainer>
                                        ))}
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
                                        <Text variant="body2">{data.rule}</Text>
                                    </S.DescriptionContainer>
                                )}
                            </S.ExpandableContainer>
                        </S.FlexContainer>
                    </S.GridContainer>
                )}
            </S.Container>
            <Dialog
                opened={modalOpened}
                onClose={closeModal}
                onConfirm={handleUnsubscribeButtonClick}
                title="Отписаться от технологии?"
            >
                Вы отписываетесь от <S.BoldSpan>{data?.name}</S.BoldSpan>
            </Dialog>
        </S.PageWrapper>
    );
};
