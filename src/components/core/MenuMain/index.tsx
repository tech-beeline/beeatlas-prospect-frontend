import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import * as S from './units';

const getMenuGroups = () => [
    {
        title: 'Проектирование CX',
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
    {
        title: 'Бизнес-архитектура',
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
                icon: Icons.Map,
                name: 'Карта\xa0возможностей',
                path: `${R.MODELS_PATH}${R.MAP_PATH}`,
            },
            ...(window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND
                ? []
                : [
                      {
                          icon: Icons.List,
                          name: 'Каталог\nE2E-сценариев',
                          path: `${R.MODELS_PATH}${R.E2E_PATH}`,
                      },
                  ]),
        ],
    },
    {
        title: 'Архитектура приложения',
        items: [
            {
                icon: Icons.Catalog,
                name: 'Каталог\xa0приложений',
                path: `${R.MODELS_PATH}${R.APPS_PATH}`,
            },
            {
                icon: Icons.NetworkRight,
                name: 'Каталог\xa0жизненных\nситуаций',
                path: `${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}`,
            },
            {
                icon: Icons.Reports,
                name: 'Аналитический\xa0отчет\nфитнес-функций',
                path: `${R.MODELS_PATH}${R.ANALYTICAL_REPORT_PATH}`,
            },
        ],
    },
    {
        title: 'Архитектура решения',
        items: [
            {
                icon: Icons.RulerPencil,
                name: 'Проекты',
                path: `${R.MODELS_PATH}${R.PROJECTS_PATH}`,
            },
        ],
    },
    {
        title: 'Техническая архитектура',
        items: [
            {
                icon: Icons.Archive,
                name: 'Каталог\xa0паттернов',
                path: `${R.MODELS_PATH}${R.PATTERNS_PATH}`,
            },
            {
                icon: Icons.DashboardDots,
                name: 'Архитектура\nкомпании',
                path: `${R.MODELS_PATH}${R.IMPACT_PATH}`,
            },
            {
                icon: Icons.Radar,
                name: 'Технорадар',
                path: `${R.MODELS_PATH}${R.TECH_RADAR_PATH}`,
            },
        ],
    },
];

export const MenuMain = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const groups = getMenuGroups();
    const menuItems = groups.flatMap((group) => group.items);

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

    return (
        <S.NavigationDrawerStyled
            isGroupTitle
            isGroupDivider
            active={getActivePath(menuItems)}
            groups={groups}
            onClickItem={handleItemClick}
        />
    );
};
