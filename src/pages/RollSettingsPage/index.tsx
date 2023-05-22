import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { observer } from 'mobx-react';

import { TitleBack } from 'components/interaction';

import { useMountEffect } from 'hooks';
import * as ROUTER from 'router/const';
import { useRootStore } from 'stores/initStore';

import * as S from './units';

export const RollSettingsPage = observer(() => {
    const {
        generalStore: { roles, getRoles, setCurrentRole },
    } = useRootStore();

    const navigate = useNavigate();

    useMountEffect(() => {
        getRoles();
    });

    const openCurrentRoleHandler = (role: any) => {
        setCurrentRole(role);

        navigate(`${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}${ROUTER.ADD_PATH}`);
    };

    return (
        <S.PageWrapper className="PageWrapper">
            <S.TitleFlex>
                <TitleBack title="Настройки ролей" fontSize="26px" />

                <Button
                    variant="contained"
                    size="medium"
                    endIcon={<Icon iconName={Icons.Add} />}
                    onClick={() => {
                        setCurrentRole(null);

                        navigate(
                            `${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}${ROUTER.ADD_PATH}`,
                        );
                    }}
                    style={{ marginTop: '30px' }}
                >
                    Создать роль
                </Button>
            </S.TitleFlex>

            <S.RolesContainer>
                {roles.map((role) => (
                    <S.Role key={role.id} onClick={() => openCurrentRoleHandler(role)}>
                        <p>{role.name}</p>
                        {/* @ts-ignore */}
                        <Icon size={24} iconName={Icons.ArrowRight} />
                    </S.Role>
                ))}
            </S.RolesContainer>
        </S.PageWrapper>
    );
});
