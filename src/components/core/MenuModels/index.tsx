import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import * as R from 'router/const';

import * as S from './units';

export const MenuModels = () => {
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
                            icon: Icons.Search,
                            name: 'Поиск\xa0ФДМ',
                            path: `${R.MODELS_PATH}${R.SEARCH_PATH}`,
                        },
                        {
                            icon: Icons.NetworkAlt,
                            name: 'ФДМ',
                            path: `${R.MODELS_PATH}${R.FDM_PATH}`,
                        },
                        {
                            icon: Icons.Radar,
                            name: 'Технорадар',
                            path: `${R.MODELS_PATH}${R.TECH_RADAR_PATH}`,
                        },
                        {
                            icon: Icons.Map,
                            name: 'Карта\xa0возможностей',
                            path: `${R.MODELS_PATH}${R.MAP_PATH}`,
                        },
                        {
                            icon: Icons.Catalog,
                            name: 'Каталог\xa0приложений',
                            path: `${R.MODELS_PATH}${R.APPS_PATH}`,
                        },
                        {
                            icon: Icons.List,
                            name: 'E2E\xa0сценарии',
                            path: `${R.MODELS_PATH}${R.E2E_PATH}`,
                        },
                    ],
                },
            ]}
            onClickItem={handleItemClick}
        />
    );
};
