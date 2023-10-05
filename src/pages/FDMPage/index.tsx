import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumbs } from '@beeline/design-system-react';

import { useWindowResize } from 'hooks';

import boxImg from './images/box.png';

import { BreadCrumbsItem, NestingMenu, TreeCard, ViewItemSwitcher } from './components';
import { useFDMStore } from './store';
import * as S from './units';

export const FDMPage = () => {
    const [activeItem, breadcrumbs] = useFDMStore((state) => [state.activeItem, state.breadcrumbs]);

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
                    {activeItem ? (
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
                                            key={index}
                                            isFullWidthCard={isFullWidthCard}
                                            item={item}
                                            data-testid="TreeCard"
                                        />
                                    ))}
                            </S.TreeContainer>
                        </>
                    ) : (
                        <>
                            <S.MockWrapper>
                                <S.Image src={boxImg} />
                                <S.MockText>Выберите сущность из списка</S.MockText>
                            </S.MockWrapper>
                        </>
                    )}
                </S.Container>
            </S.Wrapper>
        </S.PageWrapper>
    );
};
