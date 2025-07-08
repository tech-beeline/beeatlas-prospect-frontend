import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon, IconButton, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { ringIdToLabelStatusMap } from 'features/technologies';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { useGetProductsByTechnologyIdQuery } from 'api/queries/product';
import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscribedTechnologiesIdsQuery,
} from 'api/queries/subscriptions';
import { useGetTechnologyByIdQuery } from 'api/queries/technologies';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as S from './units';

export const TechnologyViewPage = () => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
    const [isAppsExpanded, setIsAppsExpanded] = useState(false);
    const [isVersionsExpanded, setIsVersionsExpanded] = useState(false);

    const { modalOpened, openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const { data: subscribedTechnologiesIds } = useGetSubscribedTechnologiesIdsQuery();
    const { data: technologyData, isLoading: isLoadingTechnology } =
        useGetTechnologyByIdQuery(paramId);
    const { data: productsData, isLoading: isLoadingProducts } = useGetProductsByTechnologyIdQuery(
        Number(paramId),
    );

    const { mutateAsync: createSubscription } = useCreateSubscriptionMutation();
    const { mutateAsync: deleteSubscrition } = useDeleteSubscriptionMutation();

    const isSubscribed = Boolean(paramId && subscribedTechnologiesIds?.includes(Number(paramId)));

    const handleTechradarClick = () => {
        navigate(`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=${paramId}`);
    };

    const handleSubscribeButtonClick = async () => {
        if (isSubscribed) {
            openModal();
        } else if (paramId) {
            await createSubscription({
                entityType: SubscriptionEntityVariants.TECH,
                id: Number(paramId),
            });
            showSnackbar({
                message:
                    'Вы подписались на изменения технологии. Уведомления будут отображаться на витрине ФДМ',
            });
        }
    };

    const handleUnsubscribeButtonClick = async () => {
        if (paramId) {
            await deleteSubscrition({
                entityType: SubscriptionEntityVariants.TECH,
                id: Number(paramId),
            });
            closeModal();
            showSnackbar({
                message: 'Вы отписаны от уведомлений',
            });
        }
    };

    return (
        <S.PageWrapper>
            <S.Container>
                <S.HeaderContainer>
                    <S.BreadcrumbContainer>
                        <Text link pointer variant="body3" onClick={handleTechradarClick}>
                            Технорадар
                        </Text>
                        <Icon iconName={Icons.NavArrowRight} size="small" />
                    </S.BreadcrumbContainer>
                    <S.SpaceBetweenContainer>
                        <S.TitleContainer>
                            {technologyData && (
                                <>
                                    <Text variant="h4">{technologyData.label}</Text>
                                    <Label
                                        title={technologyData.ring.name}
                                        variant="contained"
                                        type={ringIdToLabelStatusMap[technologyData.ring.id]}
                                    />
                                </>
                            )}
                        </S.TitleContainer>
                        <Button
                            startIcon={
                                <Icon
                                    iconName={
                                        isSubscribed ? Icons.NotificationOff : Icons.Notification
                                    }
                                />
                            }
                            onClick={handleSubscribeButtonClick}
                        >
                            {isSubscribed ? 'Отписаться' : 'Подписаться'}
                        </Button>
                    </S.SpaceBetweenContainer>
                </S.HeaderContainer>

                {isLoadingTechnology &&
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height={100} radius={12} />
                    ))}

                {technologyData && (
                    <>
                        <S.ExpandableContainer>
                            <S.SpaceBetweenContainer>
                                <Text variant="h6">История изменений</Text>
                                <IconButton
                                    iconName={
                                        isHistoryExpanded ? Icons.NavArrowUp : Icons.NavArrowDown
                                    }
                                    onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                                    size="large"
                                />
                            </S.SpaceBetweenContainer>
                            {isHistoryExpanded && (
                                <Text variant="body2">Раздел ещё в разработке</Text>
                            )}
                        </S.ExpandableContainer>
                        <S.ExpandableContainer>
                            <S.SpaceBetweenContainer>
                                <S.AppsTitleContainer>
                                    <Text variant="h6">
                                        Приложения {productsData ? `(${productsData.length})` : ''}
                                    </Text>
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
                                        Список приложений регулярно обновляется из разных источников
                                        автоматически
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
                                    {isLoadingProducts &&
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <Skeleton key={i} height={40} radius={12} />
                                        ))}
                                    {productsData &&
                                        productsData.map((product) => (
                                            <S.SpaceBetweenContainer key={product.id}>
                                                <div>
                                                    <Text variant="body2">{product.name}</Text>
                                                    <Text inactive variant="body3">
                                                        {product.alias}
                                                    </Text>
                                                </div>
                                                <Button
                                                    disabled
                                                    startIcon={
                                                        <Icon iconName={Icons.OpenInBrowser} />
                                                    }
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
                                <Text variant="h6">Версии</Text>
                                <IconButton
                                    iconName={
                                        isVersionsExpanded ? Icons.NavArrowUp : Icons.NavArrowDown
                                    }
                                    onClick={() => setIsVersionsExpanded(!isVersionsExpanded)}
                                    size="large"
                                />
                            </S.SpaceBetweenContainer>
                            {isVersionsExpanded && (
                                <>
                                    <S.SpaceBetweenContainer>
                                        <div>
                                            <Text inactive variant="body3">
                                                Начало диапазона
                                            </Text>
                                            <Text variant="body2">V1.0</Text>
                                        </div>
                                        <div>
                                            <Text inactive variant="body3">
                                                Конец диапазона
                                            </Text>
                                            <Text variant="body2">
                                                {formatNullableString(null)}
                                            </Text>
                                        </div>
                                        <div>
                                            <Text inactive variant="body3">
                                                Статус версии
                                            </Text>
                                            <Text variant="body2">Assess</Text>
                                        </div>
                                        <div>
                                            <Text inactive variant="body3">
                                                Дата создания
                                            </Text>
                                            <Text variant="body2">12.09.2024</Text>
                                        </div>
                                    </S.SpaceBetweenContainer>
                                </>
                            )}
                        </S.ExpandableContainer>
                        <S.SpaceBetweenContainer>
                            <Text variant="h5">Подробная информация</Text>
                            <Button startIcon={<Icon iconName={Icons.ShareIos} />}>Экспорт</Button>
                        </S.SpaceBetweenContainer>
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                title="Нет данных"
                                text="Технология еще не описана"
                                imageVariant={ImageVariants.EMPTY_BOX}
                            />
                        </S.NotFoundContainer>
                        {/* <S.ConfluenceContainer>
                            <Text inactive variant="h4">
                                Контент страницы confluence
                            </Text>
                        </S.ConfluenceContainer> */}
                    </>
                )}
            </S.Container>
            <Dialog
                opened={modalOpened}
                onClose={closeModal}
                onConfirm={handleUnsubscribeButtonClick}
                title="Отписаться от технологии?"
            >
                Вы отписываетесь от <S.BoldSpan>{technologyData?.label}</S.BoldSpan>
            </Dialog>
        </S.PageWrapper>
    );
};
