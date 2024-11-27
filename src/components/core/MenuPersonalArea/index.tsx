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
                location.pathname.includes(R.USERS_PATH)
                    ? `${R.ADMIN_PATH}${R.USERS_PATH}`
                    : location.pathname.includes(R.IMPORTED_DATA_PATH)
                    ? `${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}`
                    : location.pathname.includes(R.CAPABILITIES_PATH)
                    ? `${R.ADMIN_PATH}${R.CAPABILITIES_PATH}`
                    : `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}`
            }
            groups={[
                {
                    title: '',
                    items: [
                        {
                            icon: Icons.Group,
                            name: 'Управление\xa0ролями',
                            path: `${R.ADMIN_PATH}${R.USERS_PATH}`,
                        },
                        {
                            icon: Icons.Import,
                            name: 'Импортируемые\nданные\xa0\xa0',
                            path: `${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}`,
                        },
                        {
                            icon: Icons.Radar,
                            name: 'Управление\nтехнологиями',
                            path: `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}`,
                        },
                        {
                            icon: Icons.Capability,
                            name: 'Управление\nвозможностями',
                            path: `${R.ADMIN_PATH}${R.CAPABILITIES_PATH}`,
                        },
                    ],
                },
            ]}
            onClickItem={handleItemClick}
        />
    );
};
