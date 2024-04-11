import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Skeleton } from '@beeline/design-system-react';

// import { Link } from 'components/other';
import { useGetTechCapabilityProductsQuery } from 'api/queries/fdm';
import { useWindowResize } from 'hooks';

import boxImg from './images/box.png';
import boxWithQuestionImg from './images/boxWithQuestion.png';

import { ItemTypes } from './store/types';
import { BreadCrumbsItem, NestingMenu, TreeCard, ViewItemSwitcher } from './components';
// import { validateFDMParams } from './helpers';
import { useFDMStore } from './store';
import * as S from './units';

export const FDMPage = () => {
    const [activeItem, breadcrumbs, loading] = useFDMStore((state) => [
        state.activeItem,
        state.breadcrumbs,
        state.loading,
    ]);

    const { data: techCapabilityProducts, isLoading: isLoadingProducts } =
        useGetTechCapabilityProductsQuery('1', activeItem?.type === ItemTypes.TECH);

    const [params] = useSearchParams();
    const paramId = params.get('id');

    const isLinkCorrect = true;

    const isItemGroup = activeItem?.domain && activeItem.parentId === null;
    const isItemDomain = activeItem?.domain && activeItem.parentId !== null;

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

                            <S.H4 data-testid="Title">{activeItem.name}</S.H4>

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

                            {/* {activeItem.domain_ref && (
                                <>
                                    <S.DomainText>Домен</S.DomainText>
                                    <Link
                                        title={activeItem.domain_ref?.name}
                                        url={`/models/fdm?id=${activeItem.domain_ref?.id}&domainId=${activeItem.domain_ref?.id}`}
                                    />
                                </>
                            )} */}

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
        </S.PageWrapper>
    );
};
