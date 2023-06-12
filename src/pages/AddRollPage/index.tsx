import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Icon, TextField } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { observer } from 'mobx-react';
import { Nullable } from 'types/common';

import { Snackbar, TitleBack } from 'components/interaction';

import { useMountEffect } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';
import * as ROUTER from 'router/const';
import { useRootStore } from 'stores/initStore';

import * as S from './units';

export const AddRollPage = observer(() => {
    const {
        generalStore: { currentRole, createRole, changeRole, deleteRole, getRolePermission },
    } = useRootStore();

    const [isShowDropdown, setShowDropdown] = useState(false);
    const [isShowSnackbar, setShowSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState<Nullable<'create' | 'delete' | 'edit'>>(null);

    const [name, setName] = useState('');

    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, isShowDropdown, setShowDropdown);

    const navigate = useNavigate();

    const navigateToAllRoles = () =>
        navigate(`${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}`);

    const isCurrentRole = currentRole !== 'null' && currentRole !== null;

    const createRoleHandler = async (name: string) => {
        const res = (await createRole({ name })) as any;

        if (res?.data.id) {
            setSnackbarType('create');

            setShowSnackbar(true);
        }
    };

    const editRoleHandler = async (role: any) => {
        const res = (await changeRole({ id: role.id, name: role.name })) as any;

        if (res?.data.id) {
            setSnackbarType('edit');

            setShowSnackbar(true);
        }
    };

    const deleteRoleHandler = async (id: number) => {
        const res = (await deleteRole(id)) as any;

        if (res?.status === 200) {
            navigateToAllRoles();

            setSnackbarType('delete');

            setShowSnackbar(true);
        }
    };

    // обновление стр и взятия значения из сторейджа
    useMountEffect(() => {
        currentRole?.name && setName(currentRole.name);
    });

    // у бэка CORS
    useMountEffect(() => {
        currentRole?.id && getRolePermission(currentRole.id);
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

            {/* TODO: вынести на страницу выше */}
            <Snackbar
                isOpen={isShowSnackbar}
                setOpen={setShowSnackbar}
                message={
                    snackbarType === 'create'
                        ? 'Роль успешно создана'
                        : snackbarType === 'edit'
                        ? 'Изменения сохранены'
                        : 'Роль удалена'
                }
                textButton="Перейти к ролям"
                onClickButton={() => navigateToAllRoles()}
            />
        </S.PageWrapper>
    );
});
