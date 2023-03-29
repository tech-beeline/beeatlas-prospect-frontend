import React, { FC } from 'react';

// import { Chip } from '@beeline/design-system-react';
import * as C from './const';
import * as T from './types';
import * as S from './units';

export const TopMenu: FC<T.ITopMenu> = ({ activeMenuItem, setActiveMenuItem, isSubMenu }) => {
    return (
        <S.MenuWrapper>
            <S.ChipStyled
                active={activeMenuItem === 0}
                label="Весь радар"
                onClick={() => setActiveMenuItem(0)}
            />

            {(isSubMenu ? C.SUB_MENU : C.MENU).map((item) => (
                <S.ChipStyled
                    key={item.id}
                    active={activeMenuItem === item.id}
                    onClick={() => setActiveMenuItem(item.id)}
                    label={item.title}
                />
            ))}
        </S.MenuWrapper>
    );
};
