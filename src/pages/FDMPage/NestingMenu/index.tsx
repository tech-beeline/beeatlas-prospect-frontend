import React, { useState } from 'react';
import { Icon, Icons } from '@beeline/lk-ui';
import { observer } from 'mobx-react';

import { useRootStore } from 'stores/initStore';

import { Item } from './Item';
import * as S from './units';
import { formatMenuData } from './utils';

export const NestingMenu = observer(() => {
    const menuData = formatMenuData();

    const {
        generalStore: { activeFDMItem, setActiveFDMItem },
    } = useRootStore();

    const [activeLeftItem, setActiveLeftItem] = useState(0);

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
                {menuData.map((item, index) => (
                    <Item key={index} {...{ activeFDMItem, setActiveFDMItem }} {...item}>
                        {item.children}
                    </Item>
                ))}
            </S.RightSide>
        </S.Wrapper>
    );
});
