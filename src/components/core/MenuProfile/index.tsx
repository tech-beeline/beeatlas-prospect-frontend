import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetMyRolesQuery } from 'api/queries/profile';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import * as S from './units';

export const MenuProfile = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const handleItemClick = (item: string) => {
        if (item !== location.pathname) {
            navigate(item);
        }
    };

    const { data } = useGetMyRolesQuery();

    const isArchitect = !!data?.some((role) => role.alias === 'ADMINISTRATOR');

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
                                icon: Icons.PagesMultiple,
                                name: 'Мои\xa0заявки',
                                path: `${R.PROFILE_PATH}${R.APPLICATIONS_PATH}`,
                            },
                        ],
                        ...(isArchitect
                            ? [
                                  {
                                      icon: Icons.PageSearch,
                                      name: 'Согласование\xa0заявок',
                                      path: `${R.PROFILE_PATH}${R.REVIEW_PATH}`,
                                  },
                              ]
                            : []),
                        ...[
                            {
                                icon: Icons.ShareIos,
                                name: 'Экспорт\xa0файлов',
                                path: `${R.PROFILE_PATH}${R.EXPORT_PATH}`,
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
