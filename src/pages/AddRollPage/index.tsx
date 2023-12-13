import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { NumberParam, useQueryParam } from 'use-query-params';

import { TextField } from 'components/form';
import { TitleBack } from 'components/interaction';
import { NotFoundBlock } from 'components/other';

import {
    useCreateRoleMutation,
    useDeleteRoleMutation,
    useGetRoleByIdQuery,
    useGetRolePermissionsByIdQuery,
    useUpdateRoleMutation,
    useUpdateRolePermissionsMutation,
} from 'api/queries';
import { useModal } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';
import * as ROUTER from 'router/const';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { uneditablePermissionsRoles } from './const';
import { FormValues, validationSchema } from './form';
import * as S from './units';

export const AddRollPage = () => {
    const [roleId] = useQueryParam('id', NumberParam);

    const { modalOpened, openModal, closeModal } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data: roleData, isLoading: isLoadingRoleData } = useGetRoleByIdQuery(roleId);
    const { data: rolePermissions } = useGetRolePermissionsByIdQuery(roleId);
    const { mutateAsync: createRole } = useCreateRoleMutation();
    const { mutateAsync: updateRole, isLoading: isUpdatingRole } = useUpdateRoleMutation();
    const { mutateAsync: updateRolePermissions, isLoading: isUpdatingPermissions } =
        useUpdateRolePermissionsMutation();
    const { mutateAsync: deleteRole } = useDeleteRoleMutation();

    const isRoleDefault = roleData?.default === true;
    const canEditPermissions = !uneditablePermissionsRoles.has(
        (roleData?.alias ?? '').toLowerCase(),
    );

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const {
        watch,
        formState: { isDirty },
        reset,
        handleSubmit,
    } = form;

    const nameField = watch('name');

    useEffect(() => {
        if (roleData && rolePermissions && !(isUpdatingRole || isUpdatingPermissions)) {
            reset({
                name: roleData.name,
                createPermission: rolePermissions.find(
                    (permission) => permission.alias === 'CREATE_ARTIFACT',
                )?.active,
                editPermission: rolePermissions.find(
                    (permission) => permission.alias === 'EDIT_ARTIFACT',
                )?.active,
                deletePermission: rolePermissions.find(
                    (permission) => permission.alias === 'DELETE_ARTIFACT',
                )?.active,
            });
        }
    }, [roleData, rolePermissions, isUpdatingRole, isUpdatingPermissions]);

    const [isShowDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef(null);
    const toggleRef = useRef(null);

    useOutsideClick(dropdownRef, isShowDropdown, setShowDropdown, toggleRef);

    const navigate = useNavigate();

    const navigateToAllRoles = () =>
        navigate(`${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}`);

    const handleDeleteRole = async () => {
        if (roleId) {
            const res = await deleteRole(roleId);
            if (res?.status === 200) {
                showSnackbar({ message: 'Роль удалена' });
                navigateToAllRoles();
            }
        }
    };

    const onSubmit = handleSubmit(
        async ({ name, createPermission, editPermission, deletePermission }) => {
            try {
                const permissions = [];
                createPermission && permissions.push({ id: 1 });
                editPermission && permissions.push({ id: 2 });
                deletePermission && permissions.push({ id: 3 });

                if (roleId) {
                    if (roleData?.default !== true) {
                        await updateRole({ id: String(roleId), name });
                    }
                    const permissionsUpdate = await updateRolePermissions({
                        roleId,
                        permissions,
                    });

                    if (permissionsUpdate.data) {
                        showSnackbar({ message: 'Изменения сохранены' });
                        navigateToAllRoles();
                    }
                } else {
                    const res = await createRole({ name });
                    if (res?.data.id) {
                        const permissionsUpdate = await updateRolePermissions({
                            roleId: res.data.id,
                            permissions,
                        });
                        if (permissionsUpdate.data) {
                            showSnackbar({ message: 'Роль успешно создана' });
                            navigateToAllRoles();
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
    );

    const notFound = !roleData && !isLoadingRoleData;

    return (
        <S.PageWrapper className="PageWrapper">
            <S.TitleFlexGap>
                <TitleBack
                    onClick={roleId && !notFound ? openModal : navigateToAllRoles}
                    title={roleId ? 'Редактирование роли' : 'Создание новой роли'}
                    fontSize="26px"
                />

                {roleId && !notFound && !isRoleDefault && (
                    <Icon
                        ref={toggleRef}
                        iconName={Icons.MoreVert}
                        onClick={() => setShowDropdown(!isShowDropdown)}
                    />
                )}

                {isShowDropdown && (
                    <S.Dropdown className="Dropdown" ref={dropdownRef}>
                        <S.DropdownItem className="DropdownItem" onClick={handleDeleteRole}>
                            {/* size не работает */}
                            {/* @ts-ignore */}
                            <Icon iconName={Icons.Delete} type={'error' || 'default'} size={16} />
                            Удалить роль
                        </S.DropdownItem>
                    </S.Dropdown>
                )}
            </S.TitleFlexGap>

            {(!roleId || !notFound) && (
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <TextField name="name" label="Название" disabled={isRoleDefault} />

                        <S.PermissionsContainer>
                            <S.CheckboxWrapper>
                                <S.CheckboxStyled
                                    name="createPermission"
                                    label="Создание артефактов"
                                    disabled={!canEditPermissions}
                                />
                            </S.CheckboxWrapper>
                            <S.CheckboxWrapper>
                                <S.CheckboxStyled
                                    name="editPermission"
                                    label="Редактирование артефактов"
                                    disabled={!canEditPermissions}
                                />
                            </S.CheckboxWrapper>
                            <S.CheckboxWrapper>
                                <S.CheckboxStyled
                                    name="deletePermission"
                                    label="Удаление артефактов"
                                    disabled={!canEditPermissions}
                                />
                            </S.CheckboxWrapper>
                        </S.PermissionsContainer>

                        <S.BottomBlock isShown={!!nameField}>
                            <Divider />

                            <S.ButtonContainer>
                                <Button type="button" size="medium" onClick={navigateToAllRoles}>
                                    Отменить
                                </Button>

                                <Button
                                    size="medium"
                                    variant="contained"
                                    type="submit"
                                    disabled={!isDirty}
                                >
                                    Сохранить
                                </Button>
                            </S.ButtonContainer>
                        </S.BottomBlock>
                    </form>
                </FormProvider>
            )}

            {roleId && notFound && (
                <S.NotFoundContainer>
                    <NotFoundBlock text="Роль удалена или не существует" />
                </S.NotFoundContainer>
            )}
            <Dialog
                opened={modalOpened}
                title="Выйти без сохранения?"
                onClose={closeModal}
                onDecline={navigateToAllRoles}
                onConfirm={closeModal}
                declineText="Выйти"
                confirmText="Отмена"
            >
                Изменения не сохранятся
            </Dialog>
        </S.PageWrapper>
    );
};
