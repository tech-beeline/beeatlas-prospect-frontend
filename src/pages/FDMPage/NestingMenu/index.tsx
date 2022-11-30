import React, { useState } from 'react';
import { Icon, Icons, Skeleton } from '@beeline/lk-ui';
import { observer } from 'mobx-react';

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

    const [activeLeftItem, setActiveLeftItem] = useState(0);

    useMountEffect(() => {
        getGeneralMenuItems();
    });

    return (
        <S.Wrapper>
            <S.LeftSide>
                <S.LeftTab onClick={() => setActiveLeftItem(0)} isActive={activeLeftItem === 0}>
                    <Icon iconName={Icons.NetworkAlt} />
                </S.LeftTab>

                <S.LeftTab onClick={() => setActiveLeftItem(1)} isActive={activeLeftItem === 1}>
                    <Icon iconName={Icons.DashboardDots} />
                </S.LeftTab>
            </S.LeftSide>

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
        </S.Wrapper>
    );
});
