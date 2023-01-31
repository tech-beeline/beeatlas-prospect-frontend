import React, { FC } from 'react';

import * as C from './const';
import * as T from './types';
import * as S from './units';

export const TopMenu: FC<T.ITopMenu> = ({ activeMenuItem, setActiveMenuItem, isSubMenu }) => {
    return (
        <S.MenuWrapper>
            <S.MenuButton isActive={activeMenuItem === 0} onClick={() => setActiveMenuItem(0)}>
                Весь радар
            </S.MenuButton>

            {(isSubMenu ? C.SUB_MENU : C.MENU).map((item) => (
                <S.MenuButton
                    key={item.id}
                    isActive={activeMenuItem === item.id}
                    onClick={() => setActiveMenuItem(item.id)}
                >
                    {item.title}
                </S.MenuButton>
            ))}
        </S.MenuWrapper>
    );
};
