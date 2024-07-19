import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Link } from 'components/other';

import { useGetTechCapabilityProductsQuery } from 'api/queries/fdm';
import { useWindowResize } from 'hooks';

// import { Dialog } from 'widgets/Dialog';
// import { useSnackbarStore } from 'widgets/Snackbar';
import boxImg from './images/box.png';
import boxWithQuestionImg from './images/boxWithQuestion.png';

import { ItemTypes } from './store/types';
import { BreadCrumbsItem, NestingMenu, TreeCard, ViewItemSwitcher } from './components';
// import { getItemClassification, itemNameMap } from './helpers';
import { validateFDMParams } from './helpers';
import { useFDMStore } from './store';
import * as S from './units';

export const FDMPage = () => {
    // const [subscribed, setSubscribed] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    const handleCloseBannerClick = () => {
        setShowBanner(false);
    };

    // const { modalOpened, openModal, closeModal } = useModal();

    // const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [activeItem, breadcrumbs, loading] = useFDMStore((state) => [
        state.activeItem,
        state.breadcrumbs,
        state.loading,
    ]);

    const { data: techCapabilityProducts, isLoading: isLoadingProducts } =
        useGetTechCapabilityProductsQuery(activeItem?.code, activeItem?.type === ItemTypes.TECH);

    const [params] = useSearchParams();
    const paramId = params.get('id');

    // const isLinkCorrect = true;
    const isLinkCorrect = validateFDMParams(params);

    const isItemGroup = activeItem?.isDomain && activeItem.parent === null;
    const isItemDomain = activeItem?.isDomain && activeItem.parent !== null;

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

    // const handleSubscribeButtonClick = () => {
    //     if (!subscribed && activeItem) {
    //         setSubscribed(true);
    //         showSnackbar({
    //             message: `Вы подписаны на изменения ${
    //                 itemNameMap[getItemClassification(activeItem)]
    //             } и ${
    //                 getItemClassification(activeItem) === ItemClassification.DOMAIN ? 'его' : 'ее'
    //             } дочерних элементов. Уведомления будут приходить на почту и отображаться на витрине ФДМ`,
    //         });
    //     } else {
    //         openModal();
    //     }
    // };

    // const handleModalConfirm = () => {
    //     if (activeItem) {
    //         setSubscribed(false);
    //         closeModal();
    //         showSnackbar({
    //             message: `Вы отписаны от уведомлений`,
    //         });
    //     }
    // };

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

                            <S.TitleContainer>
                                <S.H4 data-testid="Title">{activeItem.name}</S.H4>
                                {/* <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={handleSubscribeButtonClick}
                                    startIcon={
                                        <Icon
                                            iconName={
                                                subscribed
                                                    ? Icons.NotificationOff
                                                    : Icons.Notification
                                            }
                                        />
                                    }
                                >
                                    Подписаться
                                </Button> */}
                            </S.TitleContainer>

                            <S.AliasText data-testid="Alias">{activeItem.code}</S.AliasText>

                            {isItemDomain && activeItem.children?.length === 0 && (
                                <S.MockWrapper data-testid="Mock">
                                    <S.Image src={boxImg} />
                                    <S.MockText>Возможностей пока нет</S.MockText>
                                </S.MockWrapper>
                            )}

                            {activeItem.description && (
                                <S.JustText
                                    dangerouslySetInnerHTML={{ __html: activeItem.description }}
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
                                    <S.DomainText>ТС Реализована в продукте</S.DomainText>
                                    <S.ChipsContainer>
                                        {isLoadingProducts && (
                                            <Skeleton height={32} radius={30} width={123} />
                                        )}
                                        {techCapabilityProducts &&
                                            techCapabilityProducts.length > 0 &&
                                            techCapabilityProducts.map((product) => (
                                                <S.ChipStyled
                                                    key={product.eaGuid}
                                                    label={product.name}
                                                />
                                            ))}
                                        {techCapabilityProducts &&
                                            techCapabilityProducts.length === 0 && (
                                                <S.ChipStyled label="Нет продуктов" />
                                            )}
                                    </S.ChipsContainer>
                                </>
                            )}

                            {!isItemGroup &&
                                !!activeItem.children &&
                                activeItem.children?.length > 0 && (
                                    <S.FlexBlock>
                                        {isItemDomain
                                            ? 'Все бизнес возможности домена'
                                            : 'Связанные технические возможности'}
                                        <S.ListSwitcherWrapper className="ListSwitcherWrapper">
                                            <ViewItemSwitcher
                                                activeElement={activeViewList}
                                                setActiveElement={setActiveViewList}
                                            />
                                        </S.ListSwitcherWrapper>
                                    </S.FlexBlock>
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
                    {isLinkCorrect && !paramId && !loading ? (
                        <>
                            <S.MockWrapper>
                                <S.Image src={boxImg} />
                                <S.MockText>Выберите сущность из списка</S.MockText>
                            </S.MockWrapper>
                        </>
                    ) : !loading && !activeItem ? (
                        <>
                            <S.MockWrapper>
                                <S.Image src={boxWithQuestionImg} />
                                <S.MockText>Указана неверная ссылка или возможность</S.MockText>
                            </S.MockWrapper>
                        </>
                    ) : (
                        <></>
                    )}
                    {!activeItem && loading && <Skeleton height={100} radius={10} />}
                </S.Container>
            </S.Wrapper>
            {/* {activeItem && (
                <Dialog
                    opened={modalOpened}
                    onClose={closeModal}
                    onConfirm={handleModalConfirm}
                    title={`Отписаться от ${itemNameMap[getItemClassification(activeItem)]}`}
                >
                    Вы отписываетесь от <S.BoldSpan>{activeItem.name}</S.BoldSpan>
                </Dialog>
            )} */}
        </S.PageWrapper>
    );
};
