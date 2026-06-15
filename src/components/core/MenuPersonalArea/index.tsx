import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

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
                    : location.pathname.includes(R.APPS_PATH)
                    ? `${R.ADMIN_PATH}${R.APPS_PATH}`
                    : location.pathname.includes(R.FILE_IMPORT_PATH)
                    ? `${R.ADMIN_PATH}${R.FILE_IMPORT_PATH}`
                    : location.pathname.includes(R.IMPORTED_DATA_PATH)
                    ? `${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}`
                    : location.pathname.includes(R.CAPABILITIES_PATH)
                    ? `${R.ADMIN_PATH}${R.CAPABILITIES_PATH}`
                    : location.pathname.includes(R.CRITERIAS_PATH)
                    ? `${R.ADMIN_PATH}${R.CRITERIAS_PATH}`
                    : location.pathname.includes(R.FITNESS_FUNCTIONS_PATH)
                    ? `${R.ADMIN_PATH}${R.FITNESS_FUNCTIONS_PATH}`
                    : location.pathname.includes(R.CYPHER_REQUEST_PATH)
                    ? `${R.ADMIN_PATH}${R.CYPHER_REQUEST_PATH}`
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
                            icon: Icons.Services,
                            name: 'Управление\nприложениями',
                            path: `${R.ADMIN_PATH}${R.APPS_PATH}`,
                        },
                        {
                            icon: Icons.Radar,
                            name: 'Управление\nтехнологиями',
                            path: `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}`,
                        },
                        {
                            icon: Icons.Settings,
                            name: 'Управление\nкритериями',
                            path: `${R.ADMIN_PATH}${R.CRITERIAS_PATH}`,
                        },
                        {
                            icon: Icons.Security,
                            name: 'Управление\nфитнес-функциями',
                            path: `${R.ADMIN_PATH}${R.FITNESS_FUNCTIONS_PATH}`,
                        },
                        {
                            icon: Icons.Import,
                            name: 'Импорт\xa0файлов',
                            path: `${R.ADMIN_PATH}${R.FILE_IMPORT_PATH}`,
                        },
                        {
                            icon: Icons.Cycle,
                            name: 'Процесс\xa0импорта',
                            path: `${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}`,
                        },
                        {
                            icon: Icons.Capability,
                            name: 'Управление\nвозможностями',
                            path: `${R.ADMIN_PATH}${R.CAPABILITIES_PATH}`,
                        },
                        {
                            icon: Icons.Map,
                            name: 'Cypher\nзапросы',
                            path: `${R.ADMIN_PATH}${R.CYPHER_REQUEST_PATH}`,
                        },
                    ],
                },
            ]}
            onClickItem={handleItemClick}
        />
    );
};
