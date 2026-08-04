import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { TitleBack } from 'components/interaction';
import { Button, Icon, Skeleton } from 'components/ui';

import { useGetAllRolesQuery } from 'api/queries';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import * as S from './units';

export const RolesPage = () => {
    const navigate = useNavigate();

    const { data: roles, isLoading } = useGetAllRolesQuery();

    const navigateToPersonalArea = () => navigate(`${R.ADMIN_PATH}${R.USERS_PATH}`);

    const openCurrentRoleHandler = (id?: number) => {
        navigate({
            pathname: `${R.ADMIN_PATH}${R.USERS_PATH}${R.ROLES_PATH}${R.ADD_PATH}`,
            search: id ? createSearchParams({ id: String(id) }).toString() : '',
        });
    };

    return (
        <S.PageWrapper className="PageWrapper">
            <S.TitleFlex>
                <TitleBack
                    title="Настройки ролей"
                    fontSize="26px"
                    onClick={navigateToPersonalArea}
                />

                <Button
                    variant="contained"
                    size="medium"
                    endIcon={<Icon iconName={Icons.Add} />}
                    onClick={() => openCurrentRoleHandler()}
                    style={{ marginTop: '30px' }}
                >
                    Создать роль
                </Button>
            </S.TitleFlex>

            <S.RolesContainer>
                {isLoading &&
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height={76} radius={10} />
                    ))}
                {/* @TODO: Убрать any, автоматиески генерировать типы со сваггера */}
                {roles &&
                    roles.map((role: any) => (
                        <S.Role key={role.id} onClick={() => openCurrentRoleHandler(role.id)}>
                            <p title={role.name}>{role.name}</p>
                            {/* @ts-ignore */}
                            <Icon size={24} iconName={Icons.ArrowRight} />
                        </S.Role>
                    ))}
            </S.RolesContainer>
        </S.PageWrapper>
    );
};
