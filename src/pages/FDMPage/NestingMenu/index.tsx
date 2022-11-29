import React, { useEffect, useState } from 'react';
import { Icon, Icons } from '@beeline/lk-ui';
import { observer } from 'mobx-react';

// import menuStaticData from './groups.json';
import menuStaticData from 'stores/GeneralStore/groups.json';
import { useRootStore } from 'stores/initStore';

import { Item } from './Item';
import * as S from './units';
import { test } from './utils';

export const NestingMenu = observer(() => {
    const menuData = test(menuStaticData);

    const {
        generalStore: {
            activeFDMItem,
            setActiveFDMItem,
            treeExpandArray,
            getItemChildren,
            itemChildren,
            // @ts-ignore
            setMenuConfig,
            // @ts-ignore
            menuConfig,
        },
    } = useRootStore();

    const [activeLeftItem, setActiveLeftItem] = useState(0);

    useEffect(() => {
        setMenuConfig(menuData);
        // console.log('menuData', menuData);
    }, []);

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
                {/* @ts-ignore */}
                {menuConfig.map((item, index) => (
                    <Item
                        key={index}
                        {...{
                            activeFDMItem,
                            setActiveFDMItem,
                            treeExpandArray,
                            getItemChildren,
                            itemChildren,
                            setMenuConfig,
                            menuConfig,
                        }}
                        {...item}
                    />
                ))}
            </S.RightSide>
        </S.Wrapper>
    );
});
