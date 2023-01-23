// import React, { FormEvent, useEffect, useState } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumbs } from '@beeline/lk-ui';
// import { Button, Search } from '@beeline/lk-ui';
import { observer } from 'mobx-react';

import { useWindowResize } from 'hooks';
// import { StringParam, useQueryParam } from 'use-query-params';
// import { Expand } from 'components/other';
// import { getSearchResult } from 'api/fdm';
import { useRootStore } from 'stores/initStore';

import boxImg from './images/box.png';

import { BreadCrumbsItem } from './BreadCrumbsItem';
// TODO: в компоненты
import { NestingMenu } from './NestingMenu';
import { TreeCard } from './TreeCard';
// import { ResultCard } from './ResultCard';
import * as S from './units';
import { ViewItemSwitcher } from './ViewItemSwitcher';

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
        <S.PageWrapper>
            <NestingMenu />

            <S.Wrapper>
                <S.Container>
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

                    <S.H4>{activeFDMItem.name}</S.H4>

                    <S.JustText dangerouslySetInnerHTML={{ __html: activeFDMItem.descr }} />

                    {JSON.stringify(activeFDMItem) !== '{}' ? (
                        <>
                            {activeFDMItem.level > 1 && activeFDMItem.children!.length > 0 && (
                                <S.ListSwitcherWrapper>
                                    <ViewItemSwitcher
                                        activeElement={activeViewList}
                                        setActiveElement={setActiveViewList}
                                    />
                                </S.ListSwitcherWrapper>
                            )}

                            <S.TreeContainer {...{ activeViewList }} ref={refTreeContainer}>
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
                        <S.MockWrapper>
                            <S.Image src={boxImg} />

                            <S.MockText>Начните поиск или выберите сущность из списка</S.MockText>
                        </S.MockWrapper>
                    )}
                </S.Container>
            </S.Wrapper>
        </S.PageWrapper>
    );
});
