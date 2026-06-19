import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { Breadcrumbs, Button, ButtonGroup, Chip, Icon, Skeleton, Tab } from 'components/ui';

import {
    useDeleteBusinessCapabilityMutation,
    useDeleteTechCapabilityMutation,
} from 'api/queries/capability';
import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscribedBusinessCapabilitiesIdsQuery,
    useGetSubscribedTechCapabilitiesIdsQuery,
} from 'api/queries/subscriptions';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal, useWindowResize } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ItemTypes } from './store/types';
import {
    ApiTable,
    BreadCrumbsItem,
    CJList,
    HistoryTable,
    NestingMenu,
    TreeCard,
    VersionInfo,
    ViewItemSwitcher,
} from './components';
import { MetricsVariants, TABS, TabVariant } from './const';
import { getItemClassification, itemToNameMap, itemToSubscriptionMessageMap } from './helpers';
import { validateFDMParams } from './helpers';
import { useFDMStore } from './store';
import { IFDMPage } from './types';
import * as S from './units';

export const FDMPage: FC<IFDMPage> = ({ isAdmin }) => {
    const [showBanner, setShowBanner] = useState(false);
    const [tabVariant, setTabVariant] = useState(TabVariant.GENERAL);

    const [metricsVariant, setMetricsVariant] = useState(MetricsVariants.API);

    const handleCloseBannerClick = () => {
        setShowBanner(false);
    };

    const {
        modalOpened: isUnsubscribeModalOpened,
        openModal: openUnsubscribeModal,
        closeModal: closeUnsubscribeModal,
    } = useModal();

    const {
        modalOpened: isDeleteModalOpened,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
    } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const navigate = useNavigate();

    const [activeItem, breadcrumbs, loading, removeItem] = useFDMStore((state) => [
        state.activeItem,
        state.breadcrumbs,
        state.loading,
        state.removeItem,
    ]);

    useEffect(() => {
        if (activeItem && activeItem.type === ItemTypes.BUSINESS && activeItem.isDomain) {
            setTabVariant(TabVariant.GENERAL);
        }
    }, [activeItem]);

    const {
        mutateAsync: createSubscription,
        isPending: isCreatingSubscription,
        error,
    } = useCreateSubscriptionMutation();
    const { mutateAsync: deleteSubscrition, isPending: isDeletingSubscription } =
        useDeleteSubscriptionMutation();

    const isUpdatingSubscriptions = isCreatingSubscription || isDeletingSubscription;

    const { data: subscribedBusinessCapabilitiyIds } =
        useGetSubscribedBusinessCapabilitiesIdsQuery();
    const { data: subscribedTechCapabilitiyIds } = useGetSubscribedTechCapabilitiesIdsQuery();

    const { mutateAsync: deleteBusinessCapability, isPending: isDeletingBusinessCapability } =
        useDeleteBusinessCapabilityMutation();
    const { mutateAsync: deleteTechCapability, isPending: isDeletingTechCapability } =
        useDeleteTechCapabilityMutation();
    const isDeletingCapability = isDeletingBusinessCapability || isDeletingTechCapability;

    const isSubscribed = Boolean(
        activeItem
            ? activeItem.type === ItemTypes.BUSINESS
                ? subscribedBusinessCapabilitiyIds?.includes(activeItem?.id)
                : subscribedTechCapabilitiyIds?.includes(activeItem?.id)
            : false,
    );

    useEffect(() => {
        if (error) {
            setShowBanner(true);
        }
    }, [error]);

    const [params, setParams] = useSearchParams();
    const paramId = params.get('id');
    const versionId = params.get('v');

    const isLinkCorrect = validateFDMParams(params);

    const isItemGroup = activeItem?.isDomain && activeItem.parent === null;
    const isItemDomain = activeItem?.isDomain && activeItem.parent !== null;
    const hasDomainChildren = activeItem?.children.some((child) => child.isDomain);

    const [isFullWidthCard, setFullWidthCard] = useState(false);
    const [activeViewList, setActiveViewList] = useState(0);

    const refTreeContainer = useRef<HTMLDivElement>(null);

    const windowWidth = useWindowResize();

    useEffect(() => {
        if (!!activeItem && refTreeContainer.current) {
            const { current } = refTreeContainer;

            const { width } = current.getBoundingClientRect();

            setFullWidthCard(width <= 623);
        }
    }, [windowWidth, activeItem]);

    const handleSubscribeButtonClick = async () => {
        if (!isSubscribed && activeItem) {
            await createSubscription({
                entityType:
                    activeItem.type === ItemTypes.BUSINESS
                        ? SubscriptionEntityVariants.BUSINESS_CAPABILITY
                        : SubscriptionEntityVariants.TECH_CAPABILITY,
                id: activeItem.id,
                subChildren: activeItem.type === ItemTypes.BUSINESS ? true : undefined,
            });
            showSnackbar({
                message: itemToSubscriptionMessageMap[getItemClassification(activeItem)],
            });
        } else {
            openUnsubscribeModal();
        }
    };

    const handleUnsubscribeConfirm = async () => {
        if (activeItem) {
            closeUnsubscribeModal();
            await deleteSubscrition({
                entityType:
                    activeItem.type === ItemTypes.BUSINESS
                        ? SubscriptionEntityVariants.BUSINESS_CAPABILITY
                        : SubscriptionEntityVariants.TECH_CAPABILITY,
                id: activeItem.id,
            });
            showSnackbar({
                message: `Вы отписаны от уведомлений`,
            });
        }
    };

    const handleDeleteConfirm = async () => {
        if (activeItem) {
            if (activeItem.type === ItemTypes.BUSINESS) {
                await deleteBusinessCapability(activeItem.code);
            } else {
                await deleteTechCapability(activeItem.code);
            }

            closeDeleteModal();

            setParams(
                new URLSearchParams(
                    activeItem.parent
                        ? {
                              id: String(activeItem.parent),
                              type: ItemTypes.BUSINESS,
                          }
                        : {},
                ),
            );

            removeItem(activeItem.id, activeItem.type);

            showSnackbar({
                message: `${
                    activeItem.type === ItemTypes.BUSINESS
                        ? 'Бизнес-возможность'
                        : 'Техническая возможность'
                } удалена`,
            });
        }
    };

    const handleEditButtonClick = () => {
        if (activeItem) {
            navigate(`${R.MODELS_PATH}${R.FDM_PATH}${R.ADD_PATH}?id=${activeItem.id}`);
        }
    };

    return (
        <S.PageWrapper>
            <NestingMenu />

            <S.Wrapper data-testid="Container">
                <S.Container>
                    {activeItem && (
                        <>
                            {breadcrumbs.length > 1 && (
                                <Breadcrumbs
                                    collapsed={breadcrumbs.length - 1 > 2}
                                    key={breadcrumbs.length}
                                >
                                    {breadcrumbs
                                        .slice(0, breadcrumbs.length - 1)
                                        .map((item, index) => (
                                            <BreadCrumbsItem
                                                key={index}
                                                id={item.id}
                                                name={item.name}
                                                type={item.type}
                                            />
                                        ))}
                                </Breadcrumbs>
                            )}

                            {showBanner && (
                                <S.BannerStyled
                                    color="error"
                                    title="Не удалось подписаться, обновите страницу и попробуйте снова"
                                    iconName={Icons.InfoCircled}
                                    onClose={handleCloseBannerClick}
                                />
                            )}

                            {!versionId && (
                                <>
                                    <S.TitleContainer>
                                        <Text variant="h4" data-testid="Title">
                                            {activeItem.name}
                                        </Text>

                                        <S.SubscribeButtonContainer>
                                            <S.ProgressButtonStyled
                                                size="small"
                                                variant="outlined"
                                                onClick={handleSubscribeButtonClick}
                                                state={
                                                    isUpdatingSubscriptions ? 'loading' : 'default'
                                                }
                                                showProgress={isUpdatingSubscriptions}
                                            >
                                                <S.ProgressButtonContent>
                                                    <Icon
                                                        iconName={
                                                            isSubscribed
                                                                ? Icons.NotificationOff
                                                                : Icons.Notification
                                                        }
                                                    />
                                                    {isSubscribed ? 'Отписаться' : 'Подписаться'}
                                                </S.ProgressButtonContent>
                                            </S.ProgressButtonStyled>
                                            {activeItem.type === ItemTypes.BUSINESS &&
                                                activeItem.isDomain === false && (
                                                    <Button
                                                        startIcon={<Icon iconName={Icons.Edit} />}
                                                        onClick={handleEditButtonClick}
                                                    />
                                                )}
                                            {isAdmin &&
                                                window.FEATURE_FLAGS.FLAG_IS_PROD === false && (
                                                    <>
                                                        <Button
                                                            startIcon={
                                                                <Icon iconName={Icons.Delete} />
                                                            }
                                                            onClick={openDeleteModal}
                                                            disabled={activeItem.hasChildren}
                                                            data-tooltip-id="delete-button"
                                                        />
                                                        {activeItem.hasChildren && (
                                                            <TooltipContainer
                                                                noArrow
                                                                largePadding
                                                                id="delete-button"
                                                                // @ts-expect-error
                                                                place="bottom-end"
                                                            >
                                                                Невозможно удалить
                                                                бизнес-возможность, имеющую дочерние
                                                                элементы. Отвяжите их и удаление
                                                                будет доступно
                                                            </TooltipContainer>
                                                        )}
                                                    </>
                                                )}
                                        </S.SubscribeButtonContainer>
                                    </S.TitleContainer>

                                    <S.AliasText data-testid="Alias">{activeItem.code}</S.AliasText>

                                    {(activeItem.type === ItemTypes.TECH ||
                                        (activeItem.type === ItemTypes.BUSINESS &&
                                            activeItem.isDomain === false)) && (
                                        <S.TabsStyled
                                            selectedTabIndex={
                                                tabVariant === TabVariant.GENERAL ? 0 : 1
                                            }
                                        >
                                            {TABS.map((tab) => (
                                                <Tab
                                                    key={tab.value}
                                                    label={tab.label}
                                                    value={tab.value}
                                                    onClick={(variant) => setTabVariant(variant)}
                                                />
                                            ))}
                                        </S.TabsStyled>
                                    )}

                                    {tabVariant === TabVariant.GENERAL && (
                                        <>
                                            {activeItem.description && (
                                                <S.JustText
                                                    dangerouslySetInnerHTML={{
                                                        __html: activeItem.description,
                                                    }}
                                                    data-testid="Description"
                                                />
                                            )}

                                            {activeItem.domainData && (
                                                <>
                                                    <S.DomainText>Домен</S.DomainText>
                                                    <Link
                                                        title={activeItem.domainData.name}
                                                        url={`/models/fdm?id=${activeItem.domainData.id}&type=BUSINESS`}
                                                    />
                                                </>
                                            )}

                                            {activeItem.type === ItemTypes.TECH && (
                                                <>
                                                    <S.DomainText>
                                                        ТС Реализована в приложении
                                                    </S.DomainText>
                                                    <S.ChipsContainer>
                                                        {activeItem.system ? (
                                                            <Chip
                                                                key={activeItem.system.id}
                                                                label={activeItem.system.name}
                                                                onClick={() =>
                                                                    window.open(
                                                                        `${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${activeItem.system?.alias}`,
                                                                    )
                                                                }
                                                            />
                                                        ) : (
                                                            formatNullableString(null)
                                                        )}
                                                    </S.ChipsContainer>
                                                </>
                                            )}

                                            <S.DomainText>Владелец</S.DomainText>
                                            <S.JustText>
                                                {activeItem.owner || 'Не определён'}
                                            </S.JustText>

                                            {activeItem.type === ItemTypes.TECH && (
                                                <S.MetricsContainer>
                                                    <ButtonGroup
                                                        alwaysSelected
                                                        size="small"
                                                        selectedOption={{ id: metricsVariant }}
                                                        options={[
                                                            {
                                                                id: MetricsVariants.API,
                                                                label: 'API',
                                                            },
                                                            // {
                                                            //     id: MetricsVariants.E2E,
                                                            //     label: 'E2E',
                                                            // },
                                                            {
                                                                id: MetricsVariants.CJ,
                                                                label: 'CJ',
                                                            },
                                                        ]}
                                                        onChange={(option) =>
                                                            setMetricsVariant(
                                                                option.id as MetricsVariants,
                                                            )
                                                        }
                                                    />
                                                    {activeItem &&
                                                        metricsVariant === MetricsVariants.API && (
                                                            <ApiTable
                                                                tcId={String(activeItem.id)}
                                                            />
                                                        )}
                                                    {metricsVariant === MetricsVariants.E2E && (
                                                        <S.MetricsFlexContainer>
                                                            <Link
                                                                title="Я, как клиент, хочу подключить домашний интернет, ТВ билайн и купить новую SIM"
                                                                url={'https://beeline.ru'}
                                                            />
                                                            <Link
                                                                title="Я, как клиент, хочу подключить домашний интернет, ТВ билайн и купить новую SIM"
                                                                url={'https://beeline.ru'}
                                                            />
                                                        </S.MetricsFlexContainer>
                                                    )}
                                                    {metricsVariant === MetricsVariants.CJ && (
                                                        <CJList tcId={String(activeItem.id)} />
                                                    )}
                                                </S.MetricsContainer>
                                            )}

                                            {!isItemGroup &&
                                                !!activeItem.children &&
                                                activeItem.children?.length > 0 && (
                                                    <S.FlexBlock>
                                                        {isItemDomain
                                                            ? hasDomainChildren
                                                                ? 'Все дочерние элементы домена'
                                                                : 'Все бизнес возможности домена'
                                                            : 'Связанные технические возможности'}
                                                        &nbsp;({activeItem.children.length})
                                                        <S.ListSwitcherWrapper className="ListSwitcherWrapper">
                                                            <ViewItemSwitcher
                                                                activeElement={activeViewList}
                                                                setActiveElement={setActiveViewList}
                                                            />
                                                        </S.ListSwitcherWrapper>
                                                    </S.FlexBlock>
                                                )}

                                            {isItemDomain && activeItem.children?.length === 0 && (
                                                <S.NoChildrenContainer data-testid="Mock">
                                                    <NotFoundBlock
                                                        imageVariant={ImageVariants.EMPTY_BOX}
                                                        text="Возможностей пока нет"
                                                    />
                                                </S.NoChildrenContainer>
                                            )}

                                            <S.TreeContainer
                                                {...{ activeViewList }}
                                                ref={refTreeContainer}
                                                data-testid="TreeContainer"
                                            >
                                                {!isItemGroup &&
                                                    activeItem.children?.map((item, index) => (
                                                        <TreeCard
                                                            key={String(item.id) + index}
                                                            isFullWidthCard={isFullWidthCard}
                                                            item={item}
                                                        />
                                                    ))}
                                            </S.TreeContainer>
                                        </>
                                    )}

                                    {tabVariant === TabVariant.HISTORY && (
                                        <HistoryTable
                                            capabilityId={activeItem.id}
                                            capabilityType={activeItem.type}
                                            setTabVariant={setTabVariant}
                                        />
                                    )}
                                </>
                            )}

                            {versionId && (
                                <VersionInfo
                                    versionId={Number(versionId)}
                                    capabilityId={String(activeItem.id)}
                                    capabilityType={activeItem.type}
                                    setTabVariant={setTabVariant}
                                />
                            )}
                        </>
                    )}
                    {isLinkCorrect && !paramId && !loading ? (
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                imageVariant={ImageVariants.EMPTY_BOX}
                                text="Выберите сущность из списка"
                            />
                        </S.NotFoundContainer>
                    ) : !loading && !activeItem ? (
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                imageVariant={ImageVariants.QUESTION_BOX}
                                text="Указана неверная ссылка или возможность"
                            />
                        </S.NotFoundContainer>
                    ) : (
                        <></>
                    )}
                    {!activeItem && loading && <Skeleton height={100} radius={10} />}
                </S.Container>
            </S.Wrapper>
            {activeItem && (
                <Dialog
                    opened={isUnsubscribeModalOpened}
                    onClose={closeUnsubscribeModal}
                    onConfirm={handleUnsubscribeConfirm}
                    title={`Отписаться от ${itemToNameMap[getItemClassification(activeItem)]}?`}
                >
                    Вы отписываетесь от <S.BoldSpan>{activeItem.name}</S.BoldSpan>
                </Dialog>
            )}
            {activeItem && (
                <Dialog
                    opened={isDeleteModalOpened}
                    onClose={closeDeleteModal}
                    onConfirm={handleDeleteConfirm}
                    title={`Удалить ${
                        activeItem.type === ItemTypes.BUSINESS
                            ? 'бизнес-возможность'
                            : 'техническую возможность'
                    }?`}
                    confirmText="Удалить"
                    isPending={isDeletingCapability}
                >
                    {activeItem.type === ItemTypes.BUSINESS
                        ? 'Бизнес-возможность '
                        : 'Техническая возможность '}
                    <S.BoldSpan>{activeItem.name}</S.BoldSpan> будет удалена
                </Dialog>
            )}
        </S.PageWrapper>
    );
};
