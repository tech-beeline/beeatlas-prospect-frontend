import React, { FC, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';

import { Checkbox } from 'components/ui';

import { useGetAllRolesQuery } from 'api/queries';
import { useUpdateProfileRolesMutation } from 'api/queries/profile';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IEditRolesMenu } from './types';
import * as S from './units';

export const EditRolesMenu: FC<IEditRolesMenu> = ({ id, login, roles }) => {
    const roleIds = roles.map((role) => Number(role.id));

    const { data } = useGetAllRolesQuery();

    const rolesSorted = [
        ...(data ?? []).filter((role) => roleIds.includes(Number(role.id))),
        ...(data ?? []).filter((role) => !roleIds.includes(Number(role.id))),
    ];

    const { mutateAsync } = useUpdateProfileRolesMutation();

    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

    useEffect(() => {
        setSelectedRoles(roles.map((role) => Number(role.id)));
    }, [roles]);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null);

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [topPlacement, setTopPlacement] = useState(false);

    const handleMenuClose = () => {
        if (!isEqual(roleIds.sort(), selectedRoles.sort())) {
            mutateAsync({ login, roles: selectedRoles.map((id) => ({ id })) });
        }

        setMenuOpen(false);
    };

    useOutsideClick(menuRef, isMenuOpen, handleMenuClose, menuButtonRef);

    const handleIconClick = () => {
        if (isMenuOpen) {
            handleMenuClose();
        } else {
            const buttonRect = menuButtonRef.current?.getBoundingClientRect();
            if ((buttonRect?.y ?? 0) + 350 > window.innerHeight) {
                setTopPlacement(true);
            } else {
                setTopPlacement(false);
            }
            setMenuOpen(true);
        }
    };

    const handleCheckboxClick = (roleId: number) => {
        if (selectedRoles.includes(roleId)) {
            setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
        } else {
            setSelectedRoles([...selectedRoles, roleId]);
        }
    };

    return (
        <S.Container>
            <S.IconStyled
                id={String(id)}
                iconName={Icons.Edit}
                ref={menuButtonRef}
                onClick={handleIconClick}
            />

            {isMenuOpen && (
                <S.MenuBlock topPlacement={topPlacement} ref={menuRef}>
                    <S.ItemsContainer>
                        {rolesSorted.map((role) => (
                            <S.MenuItem key={role.id}>
                                <Checkbox
                                    disabled={
                                        role.name === 'Сотрудник' &&
                                        roles.map((role) => role.name).includes('Сотрудник')
                                    }
                                    checked={selectedRoles.includes(Number(role.id))}
                                    label={role.name}
                                    onChange={() => handleCheckboxClick(Number(role.id))}
                                />
                            </S.MenuItem>
                        ))}
                    </S.ItemsContainer>
                </S.MenuBlock>
            )}
        </S.Container>
    );
};
