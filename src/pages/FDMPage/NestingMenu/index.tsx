import React from 'react';
import { observer } from 'mobx-react';

import { useMountEffect } from 'hooks';
import { useRootStore } from 'stores/initStore';

import { Item } from './Item';
import * as S from './units';
import { Skeleton } from '@beeline/design-system-react';

export const NestingMenu = observer(() => {
    const {
        generalStore: {
            activeFDMItem,
            setActiveFDMItem,
            treeExpandArray,
            getItemChildren,
            itemChildren,
            setMenuTreeItems,
            menuTreeItems,
            isItemChildren,
            getGeneralMenuItems,
            isLoadingMenuItems,
        },
    } = useRootStore();

    useMountEffect(() => {
        getGeneralMenuItems();
    });

    return (
        <S.Wrapper className="NestingMenuWrapper">
            <S.ResizableStyled
                defaultSize={{
                    width: 410,
                    height: '100vh',
                }}
                minWidth={300}
                maxWidth={640}
                // style={{ overflow: 'hidden auto' }}
            >
                <S.RightSide className="NestingMenuRightSide">
                    {isLoadingMenuItems ? (
                        <>
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                        </>
                    ) : (
                        menuTreeItems.map((item, index) => (
                            <Item
                                key={index}
                                {...{
                                    activeFDMItem,
                                    setActiveFDMItem,
                                    treeExpandArray,
                                    getItemChildren,
                                    itemChildren,
                                    setMenuTreeItems,
                                    menuTreeItems,
                                    isItemChildren,
                                }}
                                {...item}
                            />
                        ))
                    )}
                </S.RightSide>
            </S.ResizableStyled>
        </S.Wrapper>
    );
});
