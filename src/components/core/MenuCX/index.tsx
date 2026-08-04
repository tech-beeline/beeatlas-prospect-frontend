import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import * as S from './units';

export const MenuCX = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const handleItemClick = (item: string) => {
        if (item !== location.pathname) {
            navigate(item);
        }
    };

    return (
        <S.NavigationDrawerStyled
            isGroupTitle={false}
            isGroupDivider={false}
            active={location.pathname}
            groups={[
                {
                    title: '',
                    items: [
                        {
                            icon: Icons.Map,
                            name: 'Библиотека\xa0CJ',
                            path: `${R.CX_PATH}${R.CJ_PATH}`,
                        },
                        {
                            icon: Icons.Puzzle,
                            name: 'Библиотека\xa0BI',
                            path: `${R.CX_PATH}${R.BI_PATH}`,
                        },
                    ],
                },
            ]}
            onClickItem={handleItemClick}
        />
    );
};
