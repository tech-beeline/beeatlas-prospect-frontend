import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, IconButton, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { ringIdToLabelStatusMap } from 'features/technologies';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { PivotArrow } from 'components/other';

import { useGetProductsByTechnologyIdQuery } from 'api/queries/product';
import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscribedTechnologiesIdsQuery,
} from 'api/queries/subscriptions';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ProductCard, VersionCard } from './components';
import { ITechnologySideblock } from './types';
import * as S from './units';

export const TechnologySideblock: FC<ITechnologySideblock> = ({
    selectedTech,
    isOpen,
    onClose,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { modalOpened, openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const [showApps, setShowApps] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showVersions, setShowVersions] = useState(false);

    const { data: productsData, isLoading: isLoadingProducts } = useGetProductsByTechnologyIdQuery(
        selectedTech?.id,
    );

    const { data: subscribedTechnologiesIds } = useGetSubscribedTechnologiesIdsQuery();

    const { mutateAsync: createSubscription } = useCreateSubscriptionMutation();
    const { mutateAsync: deleteSubscrition } = useDeleteSubscriptionMutation();

    const isSubscribed = Boolean(
        selectedTech && subscribedTechnologiesIds?.includes(selectedTech.id),
    );

    const handleHistoryArrowClick = () => {
        setShowHistory(!showHistory);
    };

    const handleAppsArrowClick = () => {
        setShowApps(!showApps);
    };

    const handleSubscribeButtonClick = async () => {
        if (isSubscribed) {
            openModal();
        } else if (selectedTech) {
            await createSubscription({
                entityType: SubscriptionEntityVariants.TECH,
                id: selectedTech.id,
            });
            showSnackbar({
                message:
                    'Вы подписались на изменения технологии. Уведомления будут отображаться на витрине ФДМ',
            });
        }
    };

    const handleSeeMoreButtonClick = () => {
        if (selectedTech) {
            navigate(`${R.MODELS_PATH}${R.TECH_RADAR_PATH}${R.VIEW_PATH}?id=${selectedTech.id}`);
        }
    };

    const handleUnsubscribe = async () => {
        if (selectedTech) {
            await deleteSubscrition({
                entityType: SubscriptionEntityVariants.TECH,
                id: selectedTech.id,
            });
            closeModal();
            showSnackbar({
                message: 'Вы отписаны от уведомлений',
            });
        }
    };

    return (
        <>
            <SideBlock
                closeOnOutsideClick={false}
                outsideClickExceptionIds={['menuItem']}
                aboveContent={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <S.Container>
                    <S.TitleContainer>
                        <Text variant="h5">Информация о технологии</Text>
                        <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                    </S.TitleContainer>
                    <S.ButtonsContainer>
                        <Button
                            startIcon={
                                <Icon
                                    iconName={
                                        isSubscribed ? Icons.NotificationOff : Icons.Notification
                                    }
                                />
                            }
                            onClick={handleSubscribeButtonClick}
                            variant="plain"
                        >
                            {isSubscribed ? 'Отписаться' : 'Подписаться'}
                        </Button>
                        <Button
                            endIcon={<Icon iconName={Icons.ArrowRight} />}
                            variant="plain"
                            onClick={handleSeeMoreButtonClick}
                        >
                            Подробнее
                        </Button>
                    </S.ButtonsContainer>
                    <S.NameContainer>
                        <Text variant="h6">{selectedTech?.label}</Text>
                        <Label
                            title={selectedTech?.ring.name}
                            variant="contained"
                            type={ringIdToLabelStatusMap[selectedTech?.ring.id ?? 1]}
                        />
                    </S.NameContainer>
                    <S.DescriptionHeader inactive variant="body3">
                        Краткое описание
                    </S.DescriptionHeader>
                    <Text variant="body2">{formatNullableString(selectedTech?.description)}</Text>
                    <S.ButtonsContainer>
                        <Text variant="h6">История изменений</Text>
                        <PivotArrow
                            style={{ cursor: 'pointer' }}
                            position={showHistory && 'top'}
                            onClick={handleHistoryArrowClick}
                        />
                    </S.ButtonsContainer>
                    <S.AppsContainer open={showHistory}>
                        {/* <div>
                            <Text inactive variant="body3">
                                29.09.2024
                            </Text>
                            <Text variant="body2">Технология переведена в статус «Adopt»</Text>
                        </div>
                        <div>
                            <Text inactive variant="body3">
                                29.09.2024
                            </Text>
                            <Text variant="body2">Технология переведена в статус «Adopt»</Text>
                        </div> */}
                        <Text variant="body2">Раздел ещё в разработке</Text>
                    </S.AppsContainer>
                    <S.ButtonsContainer>
                        <S.InfoContainer>
                            <Text variant="h6">
                                Приложения{productsData && ` (${productsData.length})`}
                            </Text>
                            <Icon
                                iconName={Icons.InfoCircled}
                                style={{ cursor: 'pointer' }}
                                size="large"
                                data-tooltip-id="apps-info"
                            />
                            <TooltipContainer
                                noArrow
                                largePadding
                                // @ts-ignore Ошибка в .d.ts
                                place="top-end"
                                offset={8}
                                id="apps-info"
                            >
                                Список приложений регулярно обновляется из разных источников
                                автоматически
                            </TooltipContainer>
                        </S.InfoContainer>
                        <S.InfoContainer>
                            <PivotArrow
                                style={{ cursor: 'pointer' }}
                                position={showApps && 'top'}
                                onClick={handleAppsArrowClick}
                            />
                        </S.InfoContainer>
                    </S.ButtonsContainer>
                    <S.AppsContainer open={showApps}>
                        {productsData &&
                            productsData.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        {productsData && productsData.length === 0 && (
                            <Text variant="body2">
                                Нет информации о приложениях, но мы работаем над этим
                            </Text>
                        )}
                        {isLoadingProducts && <Skeleton height={44} radius={8} />}
                    </S.AppsContainer>
                    <S.ButtonsContainer>
                        <Text variant="h6">Версии</Text>
                        <PivotArrow
                            style={{ cursor: 'pointer' }}
                            position={showVersions && 'top'}
                            onClick={() => setShowVersions(!showVersions)}
                        />
                    </S.ButtonsContainer>
                    <S.AppsContainer open={showVersions}>
                        {selectedTech?.versions.map((version, i) => (
                            <VersionCard key={version.id} first={i === 0} version={version} />
                        ))}
                        {selectedTech?.versions.length === 0 && (
                            <Text variant="body2">Нет добавленных версий</Text>
                        )}
                    </S.AppsContainer>
                </S.Container>
            </SideBlock>
            <Dialog
                opened={modalOpened}
                onClose={closeModal}
                onConfirm={handleUnsubscribe}
                title="Отписаться от технологии?"
            >
                Вы отписываетесь от <S.BoldSpan>{selectedTech?.label}</S.BoldSpan>
            </Dialog>
        </>
    );
};
