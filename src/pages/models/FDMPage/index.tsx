import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Icon, Skeleton, Tab } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ImageVariants, Link, NotFoundBlock } from 'components/other';

import { useGetTechCapabilityProductsQuery } from 'api/queries/capability';
import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscribedBusinessCapabilitiesIdsQuery,
    useGetSubscribedTechCapabilitiesIdsQuery,
} from 'api/queries/subscriptions';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal, useWindowResize } from 'hooks';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ItemTypes } from './store/types';
import {
    BreadCrumbsItem,
    HistoryTable,
    NestingMenu,
    TreeCard,
    VersionInfo,
    ViewItemSwitcher,
} from './components';
import { TABS, TabVariant } from './const';
import { getItemClassification, itemToNameMap, itemToSubscriptionMessageMap } from './helpers';
import { validateFDMParams } from './helpers';
import { useFDMStore } from './store';
import * as S from './units';

export const FDMPage = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [tabVariant, setTabVariant] = useState(TabVariant.GENERAL);

    const handleCloseBannerClick = () => {
        setShowBanner(false);
    };

    const { modalOpened, openModal, closeModal } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [activeItem, breadcrumbs, loading] = useFDMStore((state) => [
        state.activeItem,
        state.breadcrumbs,
        state.loading,
    ]);

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

    const { data: techCapabilityProducts, isLoading: isLoadingProducts } =
        useGetTechCapabilityProductsQuery(activeItem?.code, activeItem?.type === ItemTypes.TECH);

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

    const [params] = useSearchParams();
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
            openModal();
        }
    };

    const handleModalConfirm = async () => {
        if (activeItem) {
            closeModal();
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

    return (
        <S.PageWrapper>
            <NestingMenu />

            <S.Wrapper data-testid="Container">
                <S.Container>
                    {activeItem && (
                        <>
                            {breadcrumbs.length > 1 && (
                                <Breadcrumbs
                                    collapsed={breadcrumbs.length > 2}
                                    key={breadcrumbs.length}
                                >
                                    {breadcrumbs.map((item, index) => (
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
                                        <S.H4 data-testid="Title">{activeItem.name}</S.H4>
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
                                                        ТС Реализована в продукте
                                                    </S.DomainText>
                                                    <S.ChipsContainer>
                                                        {isLoadingProducts && (
                                                            <Skeleton
                                                                height={32}
                                                                radius={30}
                                                                width={123}
                                                            />
                                                        )}
                                                        {techCapabilityProducts &&
                                                            techCapabilityProducts.length > 0 &&
                                                            techCapabilityProducts.map(
                                                                (product) => (
                                                                    <S.ChipStyled
                                                                        key={product.eaGuid}
                                                                        label={product.name}
                                                                    />
                                                                ),
                                                            )}
                                                        {techCapabilityProducts &&
                                                            techCapabilityProducts.length === 0 && (
                                                                <S.ChipStyled label="Нет продуктов" />
                                                            )}
                                                    </S.ChipsContainer>
                                                </>
                                            )}

                                            <S.DomainText>Владелец</S.DomainText>
                                            <S.JustText>
                                                {activeItem.owner || 'Не определён'}
                                            </S.JustText>

                                            <S.SubscribeButtonContainer>
                                                <S.ProgressButtonStyled
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={handleSubscribeButtonClick}
                                                    state={
                                                        isUpdatingSubscriptions
                                                            ? 'loading'
                                                            : 'default'
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
                                                        {isSubscribed
                                                            ? 'Отписаться'
                                                            : 'Подписаться'}
                                                    </S.ProgressButtonContent>
                                                </S.ProgressButtonStyled>
                                            </S.SubscribeButtonContainer>

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
                    opened={modalOpened}
                    onClose={closeModal}
                    onConfirm={handleModalConfirm}
                    title={`Отписаться от ${itemToNameMap[getItemClassification(activeItem)]}?`}
                >
                    Вы отписываетесь от <S.BoldSpan>{activeItem.name}</S.BoldSpan>
                </Dialog>
            )}
        </S.PageWrapper>
    );
};
