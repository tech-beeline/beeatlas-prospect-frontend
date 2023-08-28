import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Icon, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { observer } from 'mobx-react';

import { TitleBack } from 'components/interaction';

import { useGetAllRolesQuery } from 'api/queries/roles';
import * as ROUTER from 'router/const';

import * as S from './units';

export const RollSettingsPage = observer(() => {
    const navigate = useNavigate();

    const { data: roles, isLoading } = useGetAllRolesQuery();

    const openCurrentRoleHandler = (id?: number) => {
        navigate({
            pathname: `${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}${ROUTER.ADD_PATH}`,
            search: id ? createSearchParams({ id: String(id) }).toString() : '',
        });
    };

    return (
        <S.PageWrapper className="PageWrapper">
            <S.TitleFlex>
                <TitleBack title="Настройки ролей" fontSize="26px" />

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
                    Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={76} />)}
                {/* @TODO: Убрать any, автоматиески генерировать типы со сваггера */}
                {roles &&
                    roles.map((role: any) => (
                        <S.Role key={role.id} onClick={() => openCurrentRoleHandler(role.id)}>
                            <p>{role.name}</p>
                            {/* @ts-ignore */}
                            <Icon size={24} iconName={Icons.ArrowRight} />
                        </S.Role>
                    ))}
            </S.RolesContainer>
        </S.PageWrapper>
    );
});
