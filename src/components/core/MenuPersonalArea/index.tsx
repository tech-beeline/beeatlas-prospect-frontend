import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import * as R from 'router/const';

import * as S from './units';

export const MenuPersonalArea = () => {
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
            active={
                location.pathname.includes(R.PERSONAL_AREA_PATH)
                    ? R.PERSONAL_AREA_PATH
                    : R.IMPORTED_DATA_PATH
            }
            groups={[
                {
                    title: '',
                    items: [
                        {
                            icon: Icons.Group,
                            name: 'Управление\xa0ролями',
                            path: `${R.PERSONAL_AREA_PATH}`,
                        },
                        {
                            icon: Icons.Import,
                            name: 'Импортируемые\xa0данные',
                            path: `${R.IMPORTED_DATA_PATH}`,
                        },
                    ],
                },
            ]}
            onClickItem={handleItemClick}
        />
    );
};
