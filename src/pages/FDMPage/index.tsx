// import React, { FormEvent, useEffect, useState } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { observer } from 'mobx-react';

import { useWindowResize } from 'hooks';
import { useRootStore } from 'stores/initStore';

import boxImg from './images/box.png';

import { BreadCrumbsItem } from './BreadCrumbsItem';
// TODO: в компоненты
import { NestingMenu } from './NestingMenu';
import { TreeCard } from './TreeCard';
// import { ResultCard } from './ResultCard';
import * as S from './units';
import { ViewItemSwitcher } from './ViewItemSwitcher';
import { Breadcrumbs } from '@beeline/design-system-react';

export const FDMPage = observer(() => {
    const {
        generalStore: { activeFDMItem, setActiveFDMItem, breadCrumbsItems },
    } = useRootStore();

    const [isFullWidthCard, setFullWidthCard] = useState(false);
    const [activeViewList, setActiveViewList] = useState(0);

    const refTreeContainer = useRef(null);

    const windowWidth = useWindowResize();

    useEffect(() => {
        if (!!activeFDMItem && refTreeContainer.current) {
            const { current } = refTreeContainer;

            // @ts-ignore
            const { width } = current.getBoundingClientRect();

            setFullWidthCard(width <= 623);
        }
    }, [windowWidth, activeFDMItem]);

    return (
        <S.PageWrapper className="PageWrapper">
            <NestingMenu />

            <S.Wrapper className="Wrapper">
                <S.Container className="Container">
                    {breadCrumbsItems.length > 1 && (
                        <Breadcrumbs collapsed={breadCrumbsItems.length > 2}>
                            {breadCrumbsItems.map((item, index) => (
                                <BreadCrumbsItem
                                    key={index}
                                    {...{ item, activeFDMItem, setActiveFDMItem }}
                                />
                            ))}
                        </Breadcrumbs>
                    )}

                    <S.H4 className="H4">{activeFDMItem.name}</S.H4>

                    <S.AliasText className="AliasText">{activeFDMItem.alias}</S.AliasText>

                    {!activeFDMItem.descr && activeFDMItem.children?.length === 0 && (
                        <S.MockWrapper className="MockWrapper">
                            <S.Image className="Image" src={boxImg} />

                            <S.MockText className="MockText">Возможностей пока нет</S.MockText>
                        </S.MockWrapper>
                    )}

                    <S.JustText
                        className="JustText"
                        dangerouslySetInnerHTML={{ __html: activeFDMItem.descr }}
                    />

                    {JSON.stringify(activeFDMItem) !== '{}' ? (
                        <>
                            {activeFDMItem.level > 1 &&
                                !!activeFDMItem.children &&
                                activeFDMItem.children?.length > 0 && (
                                    <S.FlexBlock>
                                        {activeFDMItem.alias?.includes('DMN')
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
                                className="TreeContainer"
                                {...{ activeViewList }}
                                ref={refTreeContainer}
                            >
                                {/* TODO: убрать */}

                                {activeFDMItem.level > 1 &&
                                    activeFDMItem.children?.map((item, index) => (
                                        <TreeCard
                                            key={index}
                                            data={item}
                                            {...{ setActiveFDMItem, isFullWidthCard }}
                                        />
                                    ))}

                                {/* {activeFDMItem.children && activeFDMItem.children.length > 0 ? (
                                // activeFDMItem.level > 1 &&
                               
                            ) : (
                                <S.MockWrapperNoChild>
                                    <S.Image src={boxImg} />

                                    <S.MockText>Возможностей пока нет</S.MockText>
                                </S.MockWrapperNoChild>
                            )} */}
                            </S.TreeContainer>
                        </>
                    ) : (
                        <S.MockWrapper className="MockWrapper">
                            <S.Image className="Image" src={boxImg} />

                            <S.MockText className="MockText">
                                Выберите сущность из списка
                            </S.MockText>
                        </S.MockWrapper>
                    )}
                </S.Container>
            </S.Wrapper>
        </S.PageWrapper>
    );
});
