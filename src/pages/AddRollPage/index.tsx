import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Icon, TextField } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { observer } from 'mobx-react';

import { TitleBack } from 'components/interaction';

import { useMountEffect } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';
import * as ROUTER from 'router/const';
import { useRootStore } from 'stores/initStore';

import * as S from './units';

export const AddRollPage = observer(() => {
    const {
        generalStore: { currentRole, createRole, changeRole, deleteRole },
    } = useRootStore();

    const [isShowDropdown, setShowDropdown] = useState(false);
    const [isShowSnackbar, setShowSnackbar] = useState(false);

    const [name, setName] = useState('');

    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, isShowDropdown, setShowDropdown);

    const navigate = useNavigate();

    const navigateToAllRoles = () =>
        navigate(`${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}`);

    const isCurrentRole = currentRole !== 'null' && currentRole !== null;

    const createRoleHandler = async (name: string) => {
        const res = await createRole({ name });

        (res as any)?.data.id && navigateToAllRoles();
    };

    const editRoleHandler = async (role: any) => {
        const res = await changeRole({ id: role.id, name: role.name });

        (res as any)?.data.id && navigateToAllRoles();
    };

    const deleteRoleHandler = async (id: number) => {
        await deleteRole(id);

        navigateToAllRoles();
    };

    // обновление стр и взятия значения из сторейджа
    useMountEffect(() => {
        currentRole?.name && setName(currentRole.name);
    });

    return (
        <S.PageWrapper className="PageWrapper">
            <S.TitleFlexGap>
                <TitleBack
                    title={isCurrentRole ? 'Редактирование роли' : 'Создание новой роли'}
                    fontSize="26px"
                />
                {isCurrentRole && (
                    <Icon
                        iconName={Icons.MoreVert}
                        onClick={() => setShowDropdown(!isShowDropdown)}
                    />
                )}

                {isShowDropdown && (
                    <S.Dropdown className="Dropdown" ref={dropdownRef}>
                        <S.DropdownItem
                            className="DropdownItem"
                            onClick={() => deleteRoleHandler(currentRole.id)}
                        >
                            {/* size не работает */}
                            {/* @ts-ignore */}
                            <Icon iconName={Icons.Delete} type={'error' || 'default'} size={16} />
                            Удалить роль
                        </S.DropdownItem>
                    </S.Dropdown>
                )}
            </S.TitleFlexGap>

            <TextField
                label="Название"
                onChange={(event) => setName(event.target.value)}
                value={name}
                autoFocus
            />

            <S.BottomBlock isShown={!!name}>
                <Divider />

                <S.ButtonContainer>
                    <Button size="medium" onClick={() => setName('')}>
                        Отменить
                    </Button>

                    <Button
                        size="medium"
                        variant="contained"
                        onClick={() =>
                            isCurrentRole ? editRoleHandler(currentRole) : createRoleHandler(name)
                        }
                    >
                        Сохранить
                    </Button>
                </S.ButtonContainer>
            </S.BottomBlock>

            {/* <button onClick={() => setShowSnackbar(true)}>SHOW SNACKBAR</button> */}

            {/* <Snackbar isOpen={isShowSnackbar} setOpen={setShowSnackbar} message="Роль создана" /> */}
        </S.PageWrapper>
    );
});
