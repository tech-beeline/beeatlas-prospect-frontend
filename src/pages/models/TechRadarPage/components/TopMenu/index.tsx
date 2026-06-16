import React, { FC } from 'react';
import { sendAnalytics } from 'features/analytics';

import * as C from './const';
import * as T from './types';
import * as S from './units';

export const TopMenu: FC<T.ITopMenu> = ({ activeMenuItem, setActiveMenuItem, isSubMenu }) => {
    return (
        <S.MenuWrapper>
            <S.ChipStyled
                active={activeMenuItem === 0}
                label="Весь радар"
                onClick={() => {
                    setActiveMenuItem(0);
                    sendAnalytics(['techradar', 'category', 'all']);
                }}
            />

            {(isSubMenu ? C.SUB_MENU : C.MENU).map((item) => (
                <S.ChipStyled
                    key={item.id}
                    active={activeMenuItem === item.id}
                    onClick={() => {
                        setActiveMenuItem(item.id);
                        sendAnalytics(['techradar', 'category', item.name]);
                    }}
                    label={item.title}
                />
            ))}
        </S.MenuWrapper>
    );
};
