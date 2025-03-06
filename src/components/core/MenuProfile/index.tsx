import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import * as R from 'router/const';

import * as S from './units';

// const isAdmin = false;

export const MenuProfile = () => {
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
                        ...[
                            {
                                icon: Icons.Suitcase,
                                name: 'Мои\xa0подписки',
                                path: `${R.PROFILE_PATH}${R.SUBSCRIPTIONS_PATH}`,
                            },
                            {
                                icon: Icons.ShareIos,
                                name: 'Экспорт\xa0файлов',
                                path: `${R.PROFILE_PATH}${R.EXPORT_PATH}`,
                            },
                            {
                                icon: Icons.PagesMultiple,
                                name: 'Мои\xa0заявки',
                                path: `${R.PROFILE_PATH}${R.APPLICATIONS_PATH}`,
                            },
                            {
                                icon: Icons.PageSearch,
                                name: 'Согласование\xa0заявок',
                                path: `${R.PROFILE_PATH}${R.REVIEW_PATH}`,
                            },
                        ],
                        // ...(isAdmin
                        //     ? [
                        //           {
                        //               icon: Icons.PageSearch,
                        //               name: 'Согласование\xa0заявок',
                        //               path: `${R.PROFILE_PATH}${R.REVIEW_PATH}`,
                        //           },
                        //       ]
                        //     : []),
                    ],
                },
            ]}
            onClickItem={handleItemClick}
        />
    );
};
