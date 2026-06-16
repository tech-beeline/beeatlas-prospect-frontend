import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import * as S from './units';

export const MenuDatabase = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const handleItemClick = (item: string) => {
        if (item !== location.pathname) {
            navigate(item);
        }
    };

    return (
        <S.NavigationDrawerStyled
            active={location.pathname}
            groups={[
                {
                    title: 'АРХИТЕКТУРНЫЙ\xa0КОМИТЕТ',
                    items: [
                        {
                            icon: Icons.PagesMultiple,
                            name: 'Общая\xa0информация',
                            path: `${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}`,
                        },
                        {
                            icon: Icons.User,
                            name: 'Как\xa0подготовиться',
                            path: `${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}${R.ARCH_HOW_TO_PATH}`,
                        },
                        {
                            icon: Icons.RulerPencil,
                            name: 'Шаблон\xa0материалов',
                            path: `${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}${R.ARCH_TEMPLATES_PATH}`,
                        },
                    ],
                },
                {
                    title: '',
                    items: [
                        {
                            icon: Icons.PagesMultiple,
                            name: 'Техническая\xa0политика',
                            path: `${R.DATA_BASE_PATH}${R.TECH_POLICY_PATH}`,
                        },
                        {
                            icon: Icons.Services,
                            name: 'Сервисные\xa0услуги',
                            path: `${R.DATA_BASE_PATH}${R.SERVICES_PATH}`,
                        },
                    ],
                },
            ]}
            onClickItem={handleItemClick}
        />
    );
};
