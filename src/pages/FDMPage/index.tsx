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

import { BreadCrumbsItem } from './BreadCrumbsItem';
// TODO: в компоненты
import { NestingMenu } from './NestingMenu';
import { TreeCard } from './TreeCard';
// import { ResultCard } from './ResultCard';
import * as S from './units';

export const FDMPage = observer(() => {
    const {
        generalStore: { activeFDMItem, setActiveFDMItem, isLoadingChildren, breadCrumbsItems },
    } = useRootStore();

    const [isFullWidthCard, setFullWidthCard] = useState(false);

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
        <div style={{ display: 'flex' }}>
            <NestingMenu />

            <S.PageWrapper>
                <S.Container>
                    <S.H4>{activeFDMItem.name}</S.H4>

                    <S.JustText dangerouslySetInnerHTML={{ __html: activeFDMItem.descr }} />

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

                    <S.TreeContainer ref={refTreeContainer}>
                        {/* {menuTreeItems.} */}

                        {isLoadingChildren
                            ? 'LOADING...'
                            : activeFDMItem.children?.map((item, index) => (
                                  <TreeCard
                                      key={index}
                                      data={item}
                                      {...{ setActiveFDMItem, isFullWidthCard }}
                                  />
                              ))}
                    </S.TreeContainer>
                </S.Container>
            </S.PageWrapper>
        </div>
    );
});
