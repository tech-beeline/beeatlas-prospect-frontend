import React from 'react';
import { Skeleton } from '@beeline/lk-ui';
import { observer } from 'mobx-react';
import { Resizable } from 're-resizable';

import { useMountEffect } from 'hooks';
import { useRootStore } from 'stores/initStore';

import { Item } from './Item';
import * as S from './units';

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
        <S.Wrapper>
            <Resizable
                defaultSize={{
                    width: 396,
                    height: '100%',
                }}
                minWidth={396}
                maxWidth={640}
            >
                <S.RightSide>
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
            </Resizable>
        </S.Wrapper>
    );
});
