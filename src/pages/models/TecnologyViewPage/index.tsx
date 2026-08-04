import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
    MarkdownLinkRenderer,
    ringIdToLabelStatusMap,
    TechnologyFileContainer,
} from 'features/technologies';
import remarkGfm from 'remark-gfm';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import { Button, Icon, Label, Skeleton } from 'components/ui';

import { useGetProductsByTechnologyIdQuery } from 'api/queries/product';
import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscribedTechnologiesIdsQuery,
} from 'api/queries/subscriptions';
import { useGetTechnologyByIdQuery, useGetTechnologyFileByIdQuery } from 'api/queries/technologies';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';
import { downloadTextFile } from 'utils/helpers';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as S from './units';
import { filterFileText } from './utils';

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
    const { data: fileData, isLoading: isLoadingFileData } = useGetTechnologyFileByIdQuery(paramId);

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
                    'Ваша подписка на уведомления об изменениях технологии оформлена. Все оповещения будут поступать в beeatlas',
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

    const handleExportButtonClick = () => {
        if (fileData && technologyData) {
            downloadTextFile(`${technologyData.label}.md`, fileData.file);
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
                                    <S.LabelsContainer>
                                        <Label
                                            title={technologyData.ring.name}
                                            variant="contained"
                                            type={ringIdToLabelStatusMap[technologyData.ring.id]}
                                        />
                                        <Label
                                            data-tooltip-id="isCritical"
                                            title={
                                                technologyData.isCritical
                                                    ? 'Допустимо КИ'
                                                    : 'Недопустимо КИ'
                                            }
                                            variant="outline"
                                            type={technologyData.isCritical ? 'success' : 'error'}
                                        />
                                        <TooltipContainer
                                            noArrow
                                            largePadding
                                            id="isCritical"
                                            offset={10}
                                            place="top"
                                        >
                                            {technologyData.isCritical
                                                ? 'Технология допустима для использования в объекте критической инфраструктуры'
                                                : 'Технология недопустима для использования в объекте критической инфраструктуры'}
                                        </TooltipContainer>
                                    </S.LabelsContainer>
                                </>
                            )}
                        </S.TitleContainer>
                        <S.ButtonsContainer>
                            {fileData && (
                                <Button
                                    disabled={isLoadingFileData || isLoadingTechnology}
                                    startIcon={<Icon iconName={Icons.ShareIos} />}
                                    onClick={handleExportButtonClick}
                                >
                                    Экспорт
                                </Button>
                            )}
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
                </S.HeaderContainer>

                {(isLoadingTechnology || isLoadingFileData) && (
                    <S.GridContainer>
                        <Skeleton height={348} radius={12} />
                        <S.FlexContainer>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} height={100} radius={12} />
                            ))}
                        </S.FlexContainer>
                    </S.GridContainer>
                )}

                {technologyData && !(isLoadingTechnology || isLoadingFileData) && (
                    <S.GridContainer>
                        <div>
                            {!isLoadingFileData && !fileData && (
                                <S.NotFoundContainer>
                                    <NotFoundBlock
                                        title="Нет данных"
                                        text="Технология еще не описана"
                                        imageVariant={ImageVariants.EMPTY_BOX}
                                    />
                                </S.NotFoundContainer>
                            )}
                            {fileData && (
                                <TechnologyFileContainer>
                                    <Markdown
                                        components={{ a: MarkdownLinkRenderer }}
                                        urlTransform={(v) => v}
                                        remarkPlugins={[remarkGfm]}
                                    >
                                        {filterFileText(fileData.file, technologyData)}
                                    </Markdown>
                                </TechnologyFileContainer>
                            )}
                        </div>
                        <S.FlexContainer>
                            <S.ExpandableContainer>
                                <S.SpaceBetweenContainer>
                                    <Text variant="h6">История изменений</Text>
                                    <IconButton
                                        iconName={
                                            isHistoryExpanded
                                                ? Icons.NavArrowUp
                                                : Icons.NavArrowDown
                                        }
                                        onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                                        size="large"
                                    />
                                </S.SpaceBetweenContainer>
                                {isHistoryExpanded && (
                                    <>
                                        {technologyData.history &&
                                            technologyData.history.map((history) => (
                                                <div key={history.version}>
                                                    <Text inactive variant="body3">
                                                        {dayjs(history.createdDate).format(
                                                            'DD.MM.YYYY',
                                                        )}
                                                    </Text>
                                                    <Text variant="body2">
                                                        Технология переведена в статус «
                                                        {history.ring.name}»
                                                    </Text>
                                                </div>
                                            ))}
                                        {(!technologyData.history ||
                                            technologyData.history.length === 0) && (
                                            <div>
                                                <Text inactive variant="body3">
                                                    {dayjs(technologyData.createdDate).format(
                                                        'DD.MM.YYYY',
                                                    )}
                                                </Text>
                                                <Text variant="body2">
                                                    Технология создана в статусе «
                                                    {technologyData.ring.name}»
                                                </Text>
                                            </div>
                                        )}
                                    </>
                                )}
                            </S.ExpandableContainer>
                            <S.ExpandableContainer>
                                <S.SpaceBetweenContainer>
                                    <S.AppsTitleContainer>
                                        <Text variant="h6">
                                            Приложения{' '}
                                            {productsData ? `(${productsData.length})` : ''}
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
                                        {isLoadingProducts &&
                                            Array.from({ length: 3 }).map((_, i) => (
                                                <Skeleton key={i} height={40} radius={12} />
                                            ))}
                                        {productsData?.length === 0 && (
                                            <Text variant="body2">
                                                Нет информации о приложениях, но мы работаем над
                                                этим
                                            </Text>
                                        )}
                                        {productsData &&
                                            productsData.map((product) => (
                                                <S.SpaceBetweenContainer key={product.id}>
                                                    <div>
                                                        <Link
                                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${
                                                                R.VIEW_PATH
                                                            }?cmdb=${product.alias.toUpperCase()}`}
                                                            title={`${product.name}`}
                                                        />
                                                        <Text inactive variant="body3">
                                                            {product.alias}
                                                        </Text>
                                                    </div>
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
                                            isVersionsExpanded
                                                ? Icons.NavArrowUp
                                                : Icons.NavArrowDown
                                        }
                                        onClick={() => setIsVersionsExpanded(!isVersionsExpanded)}
                                        size="large"
                                    />
                                </S.SpaceBetweenContainer>
                                {isVersionsExpanded && (
                                    <>
                                        {technologyData.versions.map((version) => (
                                            <S.SpaceBetweenContainer key={version.id}>
                                                <div>
                                                    <Text inactive variant="body3">
                                                        Начало диапазона
                                                    </Text>
                                                    <Text variant="body2">
                                                        {version.versionStart}
                                                    </Text>
                                                </div>
                                                <div>
                                                    <Text inactive variant="body3">
                                                        Конец диапазона
                                                    </Text>
                                                    <Text variant="body2">
                                                        {version.versionEnd
                                                            ? version.versionEnd
                                                            : formatNullableString(null)}
                                                    </Text>
                                                </div>
                                                <div>
                                                    <Text inactive variant="body3">
                                                        Статус версии
                                                    </Text>
                                                    <Text variant="body2">{version.ring.name}</Text>
                                                </div>
                                                <div>
                                                    <Text inactive variant="body3">
                                                        Дата создания
                                                    </Text>
                                                    <Text variant="body2">
                                                        {dayjs(version.createdDate).format(
                                                            'DD.MM.YYYY',
                                                        )}
                                                    </Text>
                                                </div>
                                            </S.SpaceBetweenContainer>
                                        ))}
                                        {technologyData.versions.length === 0 && (
                                            <Text variant="body2">Нет добавленных версий</Text>
                                        )}
                                    </>
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
                Вы отписываетесь от <S.BoldSpan>{technologyData?.label}</S.BoldSpan>
            </Dialog>
        </S.PageWrapper>
    );
};
