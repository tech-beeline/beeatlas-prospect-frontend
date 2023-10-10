import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Skeleton } from '@beeline/design-system-react';

import { useWindowResize } from 'hooks';

import boxImg from './images/box.png';
import boxWithQuestionImg from './images/boxWithQuestion.png';

import { BreadCrumbsItem, NestingMenu, TreeCard, ViewItemSwitcher } from './components';
import { validateFDMParams } from './helpers';
import { useFDMStore } from './store';
import * as S from './units';

export const FDMPage = () => {
    const [activeItem, breadcrumbs, loading] = useFDMStore((state) => [
        state.activeItem,
        state.breadcrumbs,
        state.loading,
    ]);

    const [params] = useSearchParams();
    const paramId = params.get('id');

    const isLinkCorrect = validateFDMParams(params);

    const itemAliasType = activeItem?.alias?.split('.')[0];
    const isItemGroup = itemAliasType === 'GRP';
    const isItemDomain = itemAliasType === 'DMN';

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
                                            level={item.level}
                                            name={item.name}
                                        />
                                    ))}
                                </Breadcrumbs>
                            )}

                            <S.H4 data-testid="Title">{activeItem.name}</S.H4>

                            <S.AliasText data-testid="Alias">{activeItem.alias}</S.AliasText>

                            {isItemDomain && activeItem.children?.length === 0 && (
                                <S.MockWrapper data-testid="Mock">
                                    <S.Image src={boxImg} />
                                    <S.MockText>Возможностей пока нет</S.MockText>
                                </S.MockWrapper>
                            )}

                            <S.JustText
                                data-testid="Description"
                                dangerouslySetInnerHTML={{ __html: activeItem.descr }}
                            />

                            {!isItemGroup &&
                                !!activeItem.children &&
                                activeItem.children?.length > 0 && (
                                    <S.FlexBlock>
                                        {activeItem.alias?.includes('DMN')
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
                                            data-testid="TreeCard"
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
                    {paramId && !activeItem && loading && <Skeleton height={100} radius={10} />}
                </S.Container>
            </S.Wrapper>
        </S.PageWrapper>
    );
};
