import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import * as S from './units';

export const MenuModels = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const handleItemClick = (item: string) => {
        if (item !== location.pathname) {
            navigate(item);
        }
    };

    const getActivePath = (items: Array<{ path: string }>) => {
        const currentPath = location.pathname;

        const exactMatch = items.find((item) => item.path === currentPath);
        if (exactMatch) {
            return exactMatch.path;
        }

        const prefixMatch = items.find((item) => currentPath.startsWith(item.path + '/'));

        return prefixMatch ? prefixMatch.path : currentPath;
    };

    const menuItems = [
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
        ...(window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND
            ? []
            : [
                  {
                      icon: Icons.List,
                      name: 'E2E\xa0сценарии',
                      path: `${R.MODELS_PATH}${R.E2E_PATH}`,
                  },
              ]),
        {
            icon: Icons.DashboardDots,
            name: 'Архитектура\xa0компании',
            path: `${R.MODELS_PATH}${R.IMPACT_PATH}`,
        },
        {
            icon: Icons.Archive,
            name: 'Каталог\xa0паттернов',
            path: `${R.MODELS_PATH}${R.PATTERNS_PATH}`,
        },
        {
            icon: Icons.Reports,
            name: 'Аналитический\xa0отчет\nфитнес-функций',
            path: `${R.MODELS_PATH}${R.ANALYTICAL_REPORT_PATH}`,
        },
        {
            icon: Icons.NetworkRight,
            name: 'Каталог\xa0жизненных\nситуаций',
            path: `${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}`,
        },
    ];

    return (
        <S.NavigationDrawerStyled
            isGroupTitle={false}
            isGroupDivider={false}
            active={getActivePath(menuItems)}
            groups={[
                {
                    title: '',
                    items: menuItems,
                },
            ]}
            onClickItem={handleItemClick}
        />
    );
};
