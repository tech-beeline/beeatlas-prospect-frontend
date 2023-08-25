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
import { useSnackbarStore } from 'widgets/Snackbar/store';

import { PermissionItem } from './PermissionItem';
import * as S from './units';

export const AddRollPage = observer(() => {
    const {
        generalStore: {
            currentRole,
            permission,
            createRole,
            changeRole,
            deleteRole,
            getRolePermission,
        },
    } = useRootStore();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const [isShowDropdown, setShowDropdown] = useState(false);

    const [name, setName] = useState('');
    const [oldNameForEdit, setOldNameForEdit] = useState('');

    const dropdownRef = useRef(null);
    const toggleRef = useRef(null);

    useOutsideClick(dropdownRef, isShowDropdown, setShowDropdown, toggleRef);

    const navigate = useNavigate();

    const navigateToAllRoles = () =>
        navigate(`${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}`);

    const isCurrentRole = currentRole !== 'null' && currentRole !== null;

    const createRoleHandler = async (name: string) => {
        const res = (await createRole({ name })) as any;

        if (res?.data.id) {
            navigateToAllRoles();
            showSnackbar({ message: 'Роль успешно создана' });
        }
    };

    const editRoleHandler = async (role: any) => {
        const res = (await changeRole({ id: role.id, name })) as any;

        if (res?.data.id) {
            showSnackbar({ message: 'Изменения сохранены' });
            setOldNameForEdit('');
        }
    };

    const deleteRoleHandler = async (id: number) => {
        const res = (await deleteRole(id)) as any;

        if (res?.status === 200) {
            navigateToAllRoles();
            showSnackbar({ message: 'Роль удалена' });
        }
    };

    const handleSave = async () => {
        if (isCurrentRole) {
            await editRoleHandler(currentRole);
            navigateToAllRoles();
        } else {
            createRoleHandler(name);
        }
    };

    // обновление стр и взятия значения из сторейджа
    useMountEffect(() => {
        if (currentRole?.name) {
            setName(currentRole.name);

            // для дизейбла кнопки сохранить, новое имя должно отличаться от старого
            setOldNameForEdit(currentRole.name);
        }
    });

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
                        ref={toggleRef}
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

            <S.PermissionsContainer>
                {permission.map((item) => (
                    <PermissionItem key={item.id}>{item.name}</PermissionItem>
                ))}
            </S.PermissionsContainer>

            <S.BottomBlock isShown={!!name}>
                <Divider />

                <S.ButtonContainer>
                    <Button size="medium" onClick={navigateToAllRoles}>
                        Отменить
                    </Button>

                    <Button
                        size="medium"
                        variant="contained"
                        onClick={handleSave}
                        disabled={isCurrentRole && name === oldNameForEdit}
                    >
                        Сохранить
                    </Button>
                </S.ButtonContainer>
            </S.BottomBlock>
        </S.PageWrapper>
    );
});
